import { Module } from "@nestjs/common";
import { RoomUsersService } from "./room-users.service";
import { RoomUsersController } from "./room-users.controller";
import { PrismaService } from "src/orm/prisma.service";
@Module({
  controllers: [RoomUsersController],
  providers: [RoomUsersService, PrismaService],
  exports: [RoomUsersService],
})
export class RoomUsersModule {}
