import { RoomUsersModule } from "./../room-users/room-users.module";
import { Module } from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { RoomsController } from "./rooms.controller";
import { PrismaService } from "src/orm/prisma.service";
@Module({
  controllers: [RoomsController],
  providers: [RoomsService, PrismaService],
  imports: [RoomUsersModule],
  exports: [RoomsService],
})
export class RoomsModule {}
