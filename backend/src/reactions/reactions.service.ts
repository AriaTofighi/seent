import { PrismaService } from "./../prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma, Reaction } from "@prisma/client";
import { CreateReactionDto } from "./dto/create-reaction.dto";
import { ReactionFindManyParams } from "./reactions.types";

@Injectable()
export class ReactionsService {
  constructor(private prisma: PrismaService) {}

  async findMany(params: ReactionFindManyParams): Promise<Reaction[]> {
    const reactions = this.prisma.reaction.findMany(params);
    return reactions;
  }

  async create(data: Prisma.ReactionCreateInput): Promise<CreateReactionDto> {
    return await this.prisma.reaction.create({
      data,
    });
  }

  async delete(where: Prisma.ReactionWhereUniqueInput): Promise<Reaction> {
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
