import { NotificationsModule } from "src/notifications/notifications.module";
import { Module } from "@nestjs/common";
import { FriendshipsService } from "./friendships.service";
import { PrismaService } from "../orm/prisma.service";
import { FriendshipsController } from "./friendships.controller";

@Module({
  controllers: [FriendshipsController],
  imports: [NotificationsModule],
  providers: [PrismaService, FriendshipsService],
  exports: [FriendshipsService],
})
export class FriendshipsModule {}
