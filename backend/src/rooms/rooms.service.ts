import { PrismaService } from "../orm/prisma.service";
import { Injectable } from "@nestjs/common";
import { ImageType, Prisma, Room } from "@prisma/client";
import { RoomFindManyParams } from "./rooms.types";
import { createPaginator } from "utils/paginationUtils";
import { PaginatedResult } from "utils/types";
import { CreateRoomDto } from "./dto/create-room.dto";

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  private readonly _include: Prisma.RoomInclude = {
    roomUsers: {
      select: {
        roomUserId: true,
        userId: true,
        user: {
          select: {
            name: true,
            username: true,
            userId: true,
            images: {
              select: {
                url: true,
                imageId: true,
              },
              where: {
                type: ImageType.USER_AVATAR,
              },
            },
          },
        },
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
          select: {
            messageId: true,
            body: true,
            createdAt: true,
          },
        },
      },
    },
  };

  async findOne(roomWhereUniqueInput: Prisma.RoomWhereUniqueInput) {
    const room = await this.prisma.room.findUnique({
      where: roomWhereUniqueInput,
      include: this._include,
    });
    return room;
  }

  async findMany(params: RoomFindManyParams) {
    const { page, perPage, where, orderBy } = params;

    const queryArgs = {
      where,
      orderBy,
      include: this._include,
    };

    let result: PaginatedResult<Room> | Room[];
    if (page) {
      const paginate = createPaginator({ perPage: perPage });
      result = await paginate<Room, Prisma.RoomFindManyArgs>(
        this.prisma.post,
        queryArgs,
        { page: page }
      );
    } else {
      result = await this.prisma.room.findMany(queryArgs);
    }

    return result;
  }

  async create(data: CreateRoomDto) {
    const { ownerId, title, userIds } = data;

    return await this.prisma.room.create({
      data: {
        title,
        roomUsers: {
          create: userIds.map((userId) => ({
            userId,
            isOwner: userId === ownerId,
          })),
        },
      },
    });
  }

  async delete(where: Prisma.RoomWhereUniqueInput): Promise<Room> {
    return await this.prisma.room.delete({
      where,
    });
  }
}
