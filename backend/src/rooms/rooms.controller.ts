import { DeleteRoomDto } from "./dto/delete-room-dto";
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
import { RoomsService } from "./rooms.service";
import { CreateRoomDto } from "./dto/create-room.dto";
import { FindRoomsQueryDto } from "./dto/find-rooms-query.dto";
import { RoomEntity } from "./entities/room.entity";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("/api/rooms")
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() room: CreateRoomDto) {
    await this.roomsService.create(room);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async findOne(@Param("id") roomId: string) {
    const room = await this.roomsService.findOne({ roomId });
    const roomEntity = new RoomEntity(room);
    return roomEntity;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: FindRoomsQueryDto) {
    const { roomId, userId, title, page, perPage } = query;
    const rooms = this.roomsService.findMany({
      page,
      perPage,
      where: {
        roomId,
        title,
        users: {
          some: {
            userId: userId,
          },
        },
      },
    });

    return rooms;
  }

  //   @UseGuards(JwtAuthGuard)
  //   @Delete(":id")
  //   async remove(@Param("id") roomId: string, @Req() req: any) {
  //     const room = await this.roomsService.findOne({
  //       roomId,
  //     });

  //     if (req.user.userId !== room.roomUser.userId) {
  //       throw new UnauthorizedException();
  //     }

  //     return this.roomsService.delete({
  //       roomId,
  //     });
  //   }
}
