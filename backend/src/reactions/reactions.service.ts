import { PrismaService } from "./../prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma, Reaction } from "@prisma/client";
import { GetReactionDto } from "./dto/get-reaction.dto";

@Injectable()
export class ReactionsService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    reactionWhereUniqueInput: Prisma.ReactionWhereUniqueInput
  ): Promise<Reaction | null> {
    const reaction: Reaction = await this.prisma.reaction.findUnique({
      where: reactionWhereUniqueInput,
    });
    return reaction;
  }

  async findMany(params: ReactionFindManyParams): Promise<GetReactionDto[]> {
    const reactions = await this.prisma.reaction.findMany(params);
    return reactions;
  }

  async create(data: Prisma.ReactionCreateInput): Promise<GetReactionDto> {
    return await this.prisma.reaction.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.ReactionWhereUniqueInput;
    data: Prisma.ReactionUpdateInput;
  }): Promise<GetReactionDto> {
    const { where, data } = params;
    return this.prisma.reaction.update({
      data,
      where,
    });
  }

  async delete(
    where: Prisma.ReactionWhereUniqueInput
  ): Promise<GetReactionDto> {
    return this.prisma.reaction.delete({
      where,
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
