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

@Controller("/api/room-users-users")
export class RoomUsersController {
  constructor(private readonly roomUsersService: RoomUsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() roomUser: CreateRoomUserDto) {
    return this.roomUsersService.create(roomUser);
  }

  @Get()
  findAll(@Query() query: FindRoomUsersQueryDto) {
    const { roomUserId, roomId, userId, isOwner, page, perPage } = query;
    return this.roomUsersService.findMany({
      page,
      perPage,
      where: { roomUserId, roomId, userId, isOwner },
    });
  }

  //   @UseGuards(JwtAuthGuard)
  //   @Delete(":id")
  //   async remove(@Param("id") roomId: string, @Req() req: any) {
  //     const room-users = await this.roomUsersService.findOne({
  //       roomId,
  //     });

  //     if (req.user.userId !== room-users.roomUser.userId) {
  //       throw new UnauthorizedException();
  //     }

  //     return this.roomUsersService.delete({
  //       roomId,
  //     });
  //   }
}
