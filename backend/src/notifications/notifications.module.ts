import { Module } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { NotificationsController } from "./notifications.controller";
import { PrismaService } from "src/orm/prisma.service";
import { SocketModule } from "src/socket/socket.module";
@Module({
  controllers: [NotificationsController],
  imports: [SocketModule],
  providers: [NotificationsService, PrismaService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
