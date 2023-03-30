import {
  Controller,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
  Param,
} from "@nestjs/common";
import { RoomUsersService } from "./room-users.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RoomsService } from "src/rooms/rooms.service";

@Controller("/api/room-users")
export class RoomUsersController {
  constructor(
    private readonly roomUsersService: RoomUsersService,
    private readonly roomsService: RoomsService
  ) {}

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
