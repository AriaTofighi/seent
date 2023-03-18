import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ImageType, NotificationType } from "@prisma/client";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { FileUploadService } from "src/file-upload/file-upload.service";
import { ImagesService } from "src/images/images.service";
import { NotificationsService } from "src/notifications/notifications.service";
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
    private readonly notificationsService: NotificationsService
  ) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor("images"))
  @Post()
  async create(@UploadedFiles() images, @Body() post: CreatePostDto) {
    delete post.images;
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
  async findMany(@Query() query: FindPostsQueryDto) {
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
      },
      orderBy,
      page,
      perPage,
      isChild,
    });

    return result;
  }

  @Get(":id")
  async findOne(@Param("id") postId: string) {
    const post = await this.postsService.findOne({ postId });
    if (!post) {
      throw new NotFoundException("Post not found");
    }
    return post;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async update(
    @Param("id") postId: string,
    @Body() updatePostDto: UpdatePostDto
  ) {
    const { body, isPublic } = updatePostDto;
    return this.postsService.update({
      where: { postId },
      data: { body, isPublic },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async remove(@Param("id") postId: string, @Req() req) {
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
}
