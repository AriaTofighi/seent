import { forwardRef, Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PrismaService } from "../orm/prisma.service";
import { PostsController } from "./posts.controller";
import { UsersModule } from "./../users/users.module";
import { ImagesModule } from "./../images/images.module";
import { FileUploadService } from "src/file-upload/file-upload.service";
import { NotificationsModule } from "src/notifications/notifications.module";
import { AuthModule } from "src/auth/auth.module";
import { FriendshipsModule } from "src/friendships/friendships.module";

@Module({
  controllers: [PostsController],
  providers: [PrismaService, PostsService, FileUploadService],
  exports: [PostsService],
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => ImagesModule),
    NotificationsModule,
    forwardRef(() => AuthModule),
    FriendshipsModule,
  ],
})
export class PostsModule {}
