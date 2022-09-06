import { forwardRef, Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { PrismaService } from "../orm/prisma.service";
import { UsersController } from "./users.controller";
import { PostsModule } from "src/posts/posts.module";
import { ImagesModule } from "src/images/images.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
  imports: [ImagesModule, forwardRef(() => PostsModule)],
})
export class UsersModule {}
