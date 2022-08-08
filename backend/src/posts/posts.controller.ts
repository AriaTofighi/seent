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
  async findAll(@Query() query: FindPostsQueryDto) {
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
