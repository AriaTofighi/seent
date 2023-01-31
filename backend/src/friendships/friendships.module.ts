import { forwardRef, Module } from "@nestjs/common";
import { FriendshipsService } from "./friendships.service";
import { PrismaService } from "../orm/prisma.service";
import { FriendshipsController } from "./friendships.controller";
import { UsersModule } from "./../users/users.module";
import { ImagesModule } from "./../images/images.module";
import { FileUploadService } from "src/file-upload/file-upload.service";

@Module({
  controllers: [FriendshipsController],
  providers: [PrismaService, FriendshipsService, FileUploadService],
  exports: [FriendshipsService],
  imports: [forwardRef(() => UsersModule), forwardRef(() => ImagesModule)],
})
export class FriendshipsModule {}
