import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { Role } from "@prisma/client";
import { User } from "src/users/decorators/user.decorator";
import { JwtPayload } from "utils/types";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RoomUsersService } from "./../room-users/room-users.service";
import { CreateRoomDto } from "./dto/create-room.dto";
import { FindRoomsQueryDto } from "./dto/find-rooms-query.dto";
import { RoomEntity } from "./entities/room.entity";
import { RoomsService } from "./rooms.service";

@Controller("/api/rooms")
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly roomUsersService: RoomUsersService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() room: CreateRoomDto) {
    return await this.roomsService.create(room);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async findOne(@Param("id") roomId: string, @User() user: JwtPayload) {
    const isUser = user.role === Role.USER;

    const roomUser = await this.roomUsersService.findOne({
      roomId_userId: {
        roomId: roomId,
        userId: user.userId,
      },
    });

    if (isUser && !roomUser) {
      throw new UnauthorizedException();
    }

    const room = await this.roomsService.findOne({ roomId });

    const roomEntity = new RoomEntity(room);
    return roomEntity;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() query: FindRoomsQueryDto, @User() user: JwtPayload) {
    const { roomId, userId, title, page, perPage } = query;
    const notAdmin = user.role !== Role.ADMIN;
    const nonSelfRequest = userId && userId !== user.userId;

    if (notAdmin && nonSelfRequest) {
      throw new UnauthorizedException();
    }

    const rooms = this.roomsService.findMany({
      page,
      perPage,
      where: {
        roomId,
        title,
        roomUsers: {
          some: {
            userId: userId ? userId : user.userId,
          },
        },
      },
    });

    return rooms;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async remove(@Param("id") roomId: string, @User() user: JwtPayload) {
    const isUser = user.role === Role.USER;

    const roomUser = await this.roomUsersService.findOne({
      roomId_userId: {
        roomId: roomId,
        userId: user.userId,
      },
    });

    if (isUser && (!roomUser || !roomUser.isOwner)) {
      throw new UnauthorizedException();
    }

    return this.roomsService.delete({
      roomId,
    });
  }
}
