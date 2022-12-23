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
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { FindRoomsQueryDto } from "./dto/find-rooms-query.dto";

@Controller("/api/rooms")
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() room: CreateRoomDto) {
    await this.roomsService.create(room);
  }

  @Get()
  findAll(@Query() query: FindRoomsQueryDto) {
    const { roomId, userId, title, page, perPage } = query;
    // Find many query for rooms that have exactly one user with the userId in the line above
    console.log(roomId, userId, title);
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
