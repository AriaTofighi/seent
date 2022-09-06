import { PrismaService } from "../orm/prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma, Reaction } from "@prisma/client";
import { ReactionFindManyParams } from "./reactions.types";
import { createPaginator } from "utils/paginationUtils";
import { PaginatedResult } from "utils/types";

@Injectable()
export class ReactionsService {
  constructor(private prisma: PrismaService) {}

  async findOne(reactionWhereUniqueInput: Prisma.ReactionWhereUniqueInput) {
    const reaction = await this.prisma.reaction.findUnique({
      where: reactionWhereUniqueInput,
    });
    return reaction;
  }

  async findMany(params: ReactionFindManyParams) {
    const { page, perPage, where, orderBy } = params;

    const queryArgs = {
      where,
      orderBy,
    };

    let result: PaginatedResult<Reaction> | Reaction[];
    if (page) {
      const paginate = createPaginator({ perPage: perPage });
      result = await paginate<Reaction, Prisma.ReactionFindManyArgs>(
        this.prisma.post,
        queryArgs,
        { page: page }
      );
    } else {
      result = await this.prisma.reaction.findMany(queryArgs);
    }

    return result;
  }

  async create(data: Prisma.ReactionCreateInput) {
    return await this.prisma.reaction.create({
      data,
    });
  }

  async delete(where: Prisma.ReactionWhereUniqueInput): Promise<Reaction> {
    return await this.prisma.reaction.delete({
      where,
    });
  }
}
