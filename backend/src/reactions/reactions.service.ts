import { PrismaService } from "./../prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma, Reaction } from "@prisma/client";
import { ReactionFindManyParams } from "./reactions.types";
import { createPaginator } from "prisma-pagination";

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
    const paginate = createPaginator({ perPage: perPage });
    const result = await paginate<Reaction, Prisma.PostFindManyArgs>(
      this.prisma.post,
      {
        where,
        orderBy,
      },
      {
        page,
      }
    );

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
