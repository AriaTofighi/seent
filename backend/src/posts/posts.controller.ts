import { UpdatePostDto } from "./dto/update-post.dto";
import { PostsService } from "./posts.service";
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { FindPostsQueryDto } from "./dto/find-posts-query.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { FilesInterceptor } from "@nestjs/platform-express";
import { FileUploadService } from "src/file-upload/file-upload.service";
import { ImagesService } from "src/images/images.service";
import { ImageType } from "@prisma/client";

@Controller("api/posts")
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly fileUploadService: FileUploadService,
    private readonly imagesService: ImagesService
  ) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor("images"))
  @Post()
  async create(@UploadedFiles() images, @Body() post: CreatePostDto) {
    // TODO: support multiple images being uploaded from the frontend, currently can only upload one
    const uploadedImage: any = await this.fileUploadService.upload(images[0]);
    const newPost = await this.postsService.create(post);
    const image = {
      entityId: newPost.postId,
      type: ImageType.POST,
      url: uploadedImage.Location,
    };
    await this.imagesService.create(image);

    return newPost;
  }

  @Get()
  async findMany(@Query() query: FindPostsQueryDto) {
    const { skip, take, postId, parentPostId } = query;
    const posts = await this.postsService.findMany({
      skip,
      take,
      where: { postId, parentPostId },
    });

    const postsWithDepth = posts.map(async (p: any) => {
      const depth = await this.postsService.getDepth(p.postId);
      return { ...p, depth };
    });

    return Promise.all(postsWithDepth);
  }

  @Get(":id")
  async findOne(@Param("id") postId: string) {
    const post = await this.postsService.findOne({ postId });
    const depth = await this.postsService.getDepth(postId);
    return { ...post, depth };
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
  remove(@Param("id") postId: string) {
    return this.postsService.delete({ postId });
  }
}
