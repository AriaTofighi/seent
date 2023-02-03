import { Module } from "@nestjs/common";
import { FriendshipsService } from "./friendships.service";
import { PrismaService } from "../orm/prisma.service";
import { FriendshipsController } from "./friendships.controller";

@Module({
  controllers: [FriendshipsController],
  providers: [PrismaService, FriendshipsService],
  exports: [FriendshipsService],
})
export class FriendshipsModule {}
