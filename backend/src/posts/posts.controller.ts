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
} from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { FindPostsQueryDto } from "./dto/find-posts-query.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller("api/posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() post: CreatePostDto) {
    return this.postsService.create(post);
  }

  @Get()
  findAll(@Query() query: FindPostsQueryDto) {
    const { skip, take, postId, parentPostId } = query;
    return this.postsService.findMany({
      skip,
      take,
      where: { postId, parentPostId },
    });
  }

  @Get(":id")
  findOne(@Param("id") postId: string) {
    return this.postsService.findOne({ postId });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") postId: string, @Body() updatePostDto: UpdatePostDto) {
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
