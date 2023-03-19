import { DeleteRoomUserDto } from "./dto/delete-room-user-dto";
import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  UseGuards,
  Req,
  UnauthorizedException,
  Param,
} from "@nestjs/common";
import { RoomUsersService } from "./room-users.service";
import { CreateRoomUserDto } from "./dto/create-room-user.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { FindRoomUsersQueryDto } from "./dto/find-room-users-query.dto";
import { RoomsService } from "src/rooms/rooms.service";

@Controller("/api/room-users")
export class RoomUsersController {
  constructor(
    private readonly roomUsersService: RoomUsersService,
    private readonly roomsService: RoomsService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() roomUser: CreateRoomUserDto) {
    return this.roomUsersService.create(roomUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: FindRoomUsersQueryDto) {
    const { roomUserId, roomId, userId, isOwner, page, perPage } = query;
    return this.roomUsersService.findMany({
      page,
      perPage,
      where: { roomUserId, roomId, userId, isOwner },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async remove(@Param("id") roomUserId: string, @Req() req: any) {
    const roomUser = await this.roomUsersService.findOne({
      roomUserId,
    });

    if (req.user.userId !== roomUser.userId) {
      throw new UnauthorizedException();
    }

    const roomDeleted = await this.roomUsersService.delete({
      roomUserId,
    });

    const room = await this.roomsService.findOne({ roomId: roomUser.roomId });
    if (room.roomUsers.length < 2) {
      await this.roomsService.delete({ roomId: room.roomId });
    }

    return roomDeleted;
  }
}
