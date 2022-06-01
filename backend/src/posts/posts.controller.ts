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
} from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { FindPostsQueryDto } from "./dto/find-posts-query.dto";

@Controller("/api/posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() post: CreatePostDto) {
    return this.postsService.create(post);
  }

  @Get()
  findAll(@Query() query: FindPostsQueryDto) {
    const { skip, take, postId } = query;
    return this.postsService.findMany({
      skip,
      take,
      where: { postId },
    });
  }

  @Get(":id")
  findOne(@Param("id") postId: string) {
    return this.postsService.findOne({ postId });
  }

  @Patch(":id")
  update(@Param("id") postId: string, @Body() updatePostDto: UpdatePostDto) {
    const { body, public: isPublic } = updatePostDto;
    return this.postsService.update({
      where: { postId },
      data: { body, public: isPublic },
    });
  }

  @Delete(":id")
  remove(@Param("id") postId: string) {
    return this.postsService.delete({ postId });
  }
}
