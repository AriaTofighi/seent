import {
  Body,
  Controller,
  Delete,
  Get,
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
import { ImageType } from "@prisma/client";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { FileUploadService } from "src/file-upload/file-upload.service";
import { ImagesService } from "src/images/images.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { FindPostsQueryDto } from "./dto/find-posts-query.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PostsService } from "./posts.service";

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

    return newPost;
  }

  @Get()
  async findMany(@Query() query: FindPostsQueryDto) {
    const { authorId, postId, parentPostId, isChild, page, perPage, orderBy } =
      query;
    const result = await this.postsService.findMany({
      where: { authorId, postId, parentPostId: isChild ? null : parentPostId },
      orderBy,
      page,
      perPage,
    });

    return result;
  }

  @Get(":id")
  async findOne(@Param("id") postId: string) {
    const post = await this.postsService.findOne({ postId });
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
