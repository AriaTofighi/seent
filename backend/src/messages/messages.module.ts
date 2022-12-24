import { Module } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { MessagesController } from "./messages.controller";
import { PrismaService } from "src/orm/prisma.service";
@Module({
  controllers: [MessagesController],
  providers: [MessagesService, PrismaService],
  exports: [MessagesService],
})
export class MessagesModule {}
