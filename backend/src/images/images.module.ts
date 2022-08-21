import { Module } from "@nestjs/common";
import { ImagesService } from "./images.service";
import { ImagesController } from "./images.controller";
import { PrismaService } from "src/prisma.service";
import { UsersService } from "src/users/users.service";
import { PostsService } from "src/posts/posts.service";

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, PrismaService, UsersService, PostsService],
})
export class ImagesModule {}
