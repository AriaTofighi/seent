import { Prisma, Tag } from "@prisma/client";
import { PrismaService } from "../orm/prisma.service";
import { HttpException, HttpStatus, Injectable, Res } from "@nestjs/common";
import { createPaginator } from "utils/paginationUtils";
import { TagFindManyParams } from "./tags.types";

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  private readonly _include: Prisma.TagInclude = {
    _count: {
      select: {
        postTags: true,
      },
    },
  };

  async findMany(params: TagFindManyParams) {
    const { where, orderBy, page, perPage } = params;
    const queryArgs = {
      where: where,
      orderBy: orderBy,
      include: this._include,
    };

    let result;
    if (page) {
      const paginate = createPaginator({ perPage: perPage });
      result = await paginate<Tag, Prisma.TagFindManyArgs>(
        this.prisma.tag,
        queryArgs,
        { page: page }
      );
    } else {
      result = await this.prisma.tag.findMany(queryArgs);
    }

    return result;
  }

  async create(data: Prisma.TagCreateInput) {
    const existingTag = await this.prisma.tag.findUnique({
      where: { name: data.name },
    });

    if (existingTag) {
      throw new HttpException(
        `Tag with name ${data.name} already exists`,
        HttpStatus.CONFLICT
      );
    }

    return this.prisma.tag.create({
      data,
    });
  }
}
