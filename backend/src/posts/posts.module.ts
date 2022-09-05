import { forwardRef, Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PrismaService } from "../prisma.service";
import { PostsController } from "./posts.controller";
import { UsersModule } from "./../users/users.module";
import { ImagesModule } from "./../images/images.module";
import { FileUploadService } from "src/file-upload.service";

@Module({
  controllers: [PostsController],
  providers: [PrismaService, PostsService, FileUploadService],
  exports: [PostsService],
  imports: [forwardRef(() => UsersModule), forwardRef(() => ImagesModule)],
})
export class PostsModule {}
