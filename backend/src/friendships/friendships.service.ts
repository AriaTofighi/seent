import { Prisma, Friendship } from "@prisma/client";
import { PrismaService } from "../orm/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateFriendshipDto } from "./dto/create-friendship.dto";
import { FriendshipFindManyParams } from "./friendships.types";

@Injectable()
export class FriendshipsService {
  constructor(private prisma: PrismaService) {}

  private readonly FRIENDSHIP_INCLUDES: Prisma.FriendshipInclude = {
    sender: {
      select: {
        userId: true,
        username: true,
      },
    },
    recipient: {
      select: {
        userId: true,
        username: true,
      },
    },
  };

  async findOne(friendshipWhereUniqueInput: Prisma.FriendshipWhereInput) {
    const friendship = await this.prisma.friendship.findFirst({
      where: friendshipWhereUniqueInput,
      include: this.FRIENDSHIP_INCLUDES,
    });

    return friendship;
  }

  async findMany(params: FriendshipFindManyParams) {
    const { where, orderBy } = params;

    const friendships = await this.prisma.friendship.findMany({
      where,
      orderBy,
      include: this.FRIENDSHIP_INCLUDES,
    });

    return friendships;
  }

  async create(data: CreateFriendshipDto): Promise<Friendship> {
    return this.prisma.friendship.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.FriendshipWhereUniqueInput;
    data: Prisma.FriendshipUpdateInput;
  }): Promise<Friendship> {
    const { where, data } = params;
    return this.prisma.friendship.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.FriendshipWhereUniqueInput): Promise<Friendship> {
    return this.prisma.friendship.delete({
      where,
    });
  }
}
