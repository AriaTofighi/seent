import { PrismaService } from "./../prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma, Reaction } from "@prisma/client";
import { GetReactionDto } from "./dto/get-reaction.dto";
import { CreateReactionDto } from "./dto/create-reaction.dto";

@Injectable()
export class ReactionsService {
  constructor(private prisma: PrismaService) {}

  async findMany(params: ReactionFindManyParams): Promise<Reaction[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const reactions = this.prisma.reaction.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
    return reactions;
  }

  async create(data: Prisma.ReactionCreateInput): Promise<CreateReactionDto> {
    return await this.prisma.reaction.create({
      data,
    });
  }

  async delete(where: Prisma.ReactionWhereUniqueInput): Promise<Reaction> {
    console.log(where);
    return this.prisma.reaction.delete({
      where: {
        postId_userId: {
          userId: where.postId_userId.userId,
          postId: where.postId_userId.postId,
        },
      },
    });
  }
}

export type ReactionFindManyParams = {
  skip?: number;
  take?: number;
  cursor?: Prisma.ReactionWhereUniqueInput;
  where?: Prisma.ReactionWhereInput;
  orderBy?: Prisma.ReactionOrderByWithRelationInput;
};
