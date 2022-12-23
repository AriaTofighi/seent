import { PrismaService } from "../orm/prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma, Room } from "@prisma/client";
import { RoomFindManyParams } from "./rooms.types";
import { createPaginator } from "utils/paginationUtils";
import { PaginatedResult } from "utils/types";

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  async findOne(roomWhereUniqueInput: Prisma.RoomWhereUniqueInput) {
    const room = await this.prisma.room.findUnique({
      where: roomWhereUniqueInput,
    });
    return room;
  }

  async findMany(params: RoomFindManyParams) {
    const { page, perPage, where, orderBy } = params;

    const queryArgs = {
      where,
      orderBy,
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

  async create(data: Prisma.RoomCreateInput) {
    return await this.prisma.room.create({
      data,
    });
  }

  async delete(where: Prisma.RoomWhereUniqueInput): Promise<Room> {
    return await this.prisma.room.delete({
      where,
    });
  }
}
