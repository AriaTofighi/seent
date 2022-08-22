import { PrismaService } from "../prisma.service";
import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { FileUploadService } from "src/file-upload/file-upload.service";
import { ImagesService } from "src/images/images.service";
import { UsersService } from "src/users/users.service";

@Module({
  controllers: [PostsController],
  providers: [
    PrismaService,
    PostsService,
    FileUploadService,
    UsersService,
    ImagesService,
  ],
})
export class PostsModule {}
