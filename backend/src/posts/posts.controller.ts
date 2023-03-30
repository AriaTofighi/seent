import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { Post } from "@nestjs/common/decorators";
import { UnauthorizedException } from "@nestjs/common/exceptions";
import { FilesInterceptor } from "@nestjs/platform-express";
import {
  ImageType,
  NotificationType,
  Post as PrismaPost,
} from "@prisma/client";
import { AuthService } from "src/auth/auth.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { FileUploadService } from "src/file-upload/file-upload.service";
import { ImagesService } from "src/images/images.service";
import { NotificationsService } from "src/notifications/notifications.service";
import { User } from "src/users/decorators/user.decorator";
import { JwtPayload } from "utils/types";
import { CreatePostDto } from "./dto/create-post.dto";
import { FindPostsQueryDto } from "./dto/find-posts-query.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PostsService } from "./posts.service";

@Controller("api/posts")
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly fileUploadService: FileUploadService,
    private readonly imagesService: ImagesService,
    private readonly notificationsService: NotificationsService,
    private readonly authService: AuthService
  ) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor("images"))
  @Post()
  async create(
    @UploadedFiles() images,
    @Body() post: CreatePostDto,
    @User() user: JwtPayload
  ) {
    delete post.images;

    if (user.userId !== post.authorId) {
      throw new UnauthorizedException();
    }

    const newPost = await this.postsService.create(post);

    if (images[0]) {
      const uploadedImage: any = await this.fileUploadService.upload(images[0]);
      const image = {
        postId: newPost.postId,
        type: ImageType.POST,
        url: uploadedImage.Location,
      };
      await this.imagesService.create(image);
    }

    if (newPost.parentPostId) {
      await this.notificationsService.create({
        type: NotificationType.REPLY,
        sender: {
          connect: {
            userId: newPost.authorId,
          },
        },
        recipient: {
          connect: {
            userId: newPost.parentPost.author.userId,
          },
        },
        post: {
          connect: {
            postId: newPost.postId,
          },
        },
      });
    }

    return newPost;
  }

  @Get()
  async findMany(@Query() query: FindPostsQueryDto, @Req() req) {
    const orClause = await this.getOrClause(req);

    const {
      authorId,
      postId,
      parentPostId,
      isChild,
      page,
      perPage,
      orderBy,
      search,
    } = query;

    const result = await this.postsService.findMany({
      where: {
        authorId,
        postId,
        parentPostId,
        body: { contains: search, mode: "insensitive" },
        OR: orClause.length > 0 ? orClause : undefined,
      },
      orderBy,
      page,
      perPage,
      isChild,
    });

    return result;
  }

  @Get(":id")
  async findOne(@Param("id") postId: string, @Req() req) {
    const orClause = await this.getOrClause(req);
    const posts = (await this.postsService.findMany({
      where: {
        postId,
        OR: orClause.length > 0 ? orClause : undefined,
      },
    })) as PrismaPost[];
    if (posts.length != 1) {
      throw new NotFoundException("Post not found");
    }
    return posts[0];
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async update(
    @Param("id") postId: string,
    @Body() updatePostDto: UpdatePostDto,
    @User() user: JwtPayload
  ) {
    const { body, isPublic } = updatePostDto;
    const post = await this.postsService.findOne({ postId });

    if (user.userId !== post.authorId) {
      throw new UnauthorizedException();
    }

    return this.postsService.update({
      where: { postId },
      data: { body, isPublic },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async remove(@Param("id") postId: string, @User() user: JwtPayload) {
    const post = await this.postsService.findOne({ postId });

    if (post.authorId !== user.userId) {
      throw new UnauthorizedException();
    }

    const images = await this.imagesService.findMany({
      where: { postId: postId },
    });
    const deletions = [];
    for (const image of images) {
      deletions.push(this.imagesService.delete({ imageId: image.imageId }));
    }
    await Promise.all(deletions);
    return this.postsService.delete({ postId });
  }

  private async getOrClause(req: any) {
    const orClause = [];
    orClause.push({ isPublic: true });

    if (req.headers.authorization) {
      const token = req.headers.authorization.replace("Bearer ", "");
      const user = await this.authService.validateToken(token);

      if (user) {
        orClause.push({
          author: {
            receivedFriendships: {
              some: {
                status: "ACCEPTED",
                sender: {
                  userId: user.userId,
                },
              },
            },
          },
        });
        orClause.push({
          author: {
            sentFriendships: {
              some: {
                status: "ACCEPTED",
                recipient: {
                  userId: user.userId,
                },
              },
            },
          },
        });
        orClause.push({
          authorId: user.userId,
        });
      }
    }

    return orClause;
  }
}
