import { Module } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { MessagesController } from "./messages.controller";
import { PrismaService } from "src/orm/prisma.service";
import { MessagesGateway } from "./messages.gateway";
import { UsersModule } from "src/users/users.module";
import { SocketModule } from "src/socket/socket.module";
@Module({
  controllers: [MessagesController],
  imports: [SocketModule],
  providers: [MessagesService, PrismaService, MessagesGateway],
  exports: [MessagesService],
})
export class MessagesModule {}
