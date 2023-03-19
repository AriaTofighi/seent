import { Module } from "@nestjs/common";
import { RoomUsersService } from "./room-users.service";
import { RoomUsersController } from "./room-users.controller";
import { PrismaService } from "src/orm/prisma.service";
import { forwardRef } from "@nestjs/common/utils";
import { RoomsModule } from "src/rooms/rooms.module";
@Module({
  controllers: [RoomUsersController],
  providers: [RoomUsersService, PrismaService],
  imports: [forwardRef(() => RoomsModule)],
  exports: [RoomUsersService],
})
export class RoomUsersModule {}
