import { Module } from "@nestjs/common";
import { ReactionsService } from "./reactions.service";
import { ReactionsController } from "./reactions.controller";
import { PrismaService } from "src/orm/prisma.service";
import { NotificationsModule } from "src/notifications/notifications.module";
@Module({
  controllers: [ReactionsController],
  providers: [ReactionsService, PrismaService],
  exports: [ReactionsService],
  imports: [NotificationsModule],
})
export class ReactionsModule {}
