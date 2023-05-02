import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { TagsService } from "./tags.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateTagDto } from "./dto/create-tag.dto";
import { FindTagsQueryDto } from "./dto/find-tags-query.dto";

@Controller("/api/tags")
export class TagssController {
  constructor(private readonly tagsService: TagsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() tag: CreateTagDto) {
    return await this.tagsService.create(tag);
  }

  @Get()
  async findMany(@Query() query: FindTagsQueryDto) {
    const { sortBy, sortOrder, search, page, perPage } = query;

    const result = await this.tagsService.findMany({
      where: {
        name: {
          contains: search,
        },
      },
      orderBy: {
        postTags:
          sortBy === "posts"
            ? { _count: sortOrder === "desc" ? "desc" : "asc" }
            : undefined,
        createdAt:
          sortBy === "createdAt"
            ? sortOrder === "desc"
              ? "desc"
              : "asc"
            : undefined,
      },
      page: page,
      perPage: perPage,
    });

    return result;
  }
}
