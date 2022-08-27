import { forwardRef, Module } from "@nestjs/common";
import { ImagesService } from "./images.service";
import { PrismaService } from "src/prisma.service";
import { PostsModule } from "src/posts/posts.module";
import { UsersModule } from "src/users/users.module";
import { ImagesController } from "./images.controller";
import { FileUploadService } from "src/file-upload/file-upload.service";

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, PrismaService, FileUploadService],
  exports: [ImagesService],
  imports: [forwardRef(() => UsersModule), forwardRef(() => PostsModule)],
})
export class ImagesModule {}
