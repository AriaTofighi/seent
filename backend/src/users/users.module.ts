import { PostsService } from "./../posts/posts.service";
import { PrismaService } from "./../prisma.service";
import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { ImagesService } from "src/images/images.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, ImagesService, PostsService],
  exports: [UsersService],
})
export class UsersModule {}
