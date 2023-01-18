import { Module } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { MessagesController } from "./messages.controller";
import { PrismaService } from "src/orm/prisma.service";
import { MessagesGateway } from "./messages.gateway";
import { SocketModule } from "src/socket/socket.module";
import { RoomUsersModule } from "src/room-users/room-users.module";

@Module({
  controllers: [MessagesController],
  imports: [SocketModule, RoomUsersModule],
  providers: [MessagesService, PrismaService, MessagesGateway],
  exports: [MessagesService],
})
export class MessagesModule {}
