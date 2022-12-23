import { PrismaService } from "../orm/prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma, RoomUser } from "@prisma/client";
import { RoomUserFindManyParams } from "./room-users.types";
import { createPaginator } from "utils/paginationUtils";
import { PaginatedResult } from "utils/types";

@Injectable()
export class RoomUsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(roomWhereUniqueInput: Prisma.RoomUserWhereUniqueInput) {
    const roomUsers = await this.prisma.roomUser.findUnique({
      where: roomWhereUniqueInput,
    });
    return roomUsers;
  }

  async findMany(params: RoomUserFindManyParams) {
    const { page, perPage, where, orderBy } = params;

    const queryArgs = {
      where,
      orderBy,
    };

    let result: PaginatedResult<RoomUser> | RoomUser[];
    if (page) {
      const paginate = createPaginator({ perPage: perPage });
      result = await paginate<RoomUser, Prisma.RoomFindManyArgs>(
        this.prisma.post,
        queryArgs,
        { page: page }
      );
    } else {
      result = await this.prisma.roomUser.findMany(queryArgs);
    }

    return result;
  }

  async create(data: Prisma.RoomUserCreateInput) {
    return await this.prisma.roomUser.create({
      data,
    });
  }

  async delete(where: Prisma.RoomUserWhereUniqueInput): Promise<RoomUser> {
    return await this.prisma.roomUser.delete({
      where,
    });
  }
}
