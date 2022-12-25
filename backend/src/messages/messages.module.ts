import { Module } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { MessagesController } from "./messages.controller";
import { PrismaService } from "src/orm/prisma.service";
import { MessagesGateway } from "./messages.gateway";
@Module({
  controllers: [MessagesController],
  providers: [MessagesService, PrismaService, MessagesGateway],
  exports: [MessagesService],
})
export class MessagesModule {}
