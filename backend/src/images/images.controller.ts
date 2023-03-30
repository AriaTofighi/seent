import { ImagesService } from "./images.service";
import {
  Controller,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
  Post,
  BadRequestException,
} from "@nestjs/common";
import { CreateImageDto } from "./dto/create-image.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { FileUploadService } from "src/file-upload/file-upload.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ImageType, Prisma } from "@prisma/client";
import { JwtPayload } from "utils/types";
import { User } from "src/users/decorators/user.decorator";

@Controller("api/images")
export class ImagesController {
  constructor(
    private readonly imagesService: ImagesService,
    private readonly fileUploadService: FileUploadService
  ) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("image"))
  @Post()
  async create(
    @UploadedFile() imageFile: Express.Multer.File,
    @Body() image: CreateImageDto,
    @User() user: JwtPayload
  ) {
    if (image.type === ImageType.USER_AVATAR) {
      if (!image.userId || image.postId) {
        throw new BadRequestException();
      }

      if (image.userId !== user.userId) {
        throw new UnauthorizedException();
      }

      const userAvatars = await this.imagesService.findMany({
        where: { type: ImageType.USER_AVATAR, userId: image.userId },
      });
      if (userAvatars.length > 0) {
        throw new BadRequestException();
      }
    }
    const uploadedImage: any = await this.fileUploadService.upload(imageFile);
    const newImage: Prisma.ImageUncheckedCreateInput = {
      postId: image.postId,
      userId: image.userId,
      type: image.type,
      url: uploadedImage.Location,
    };
    return await this.imagesService.create(newImage);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("image"))
  @Patch(":id")
  async update(
    @UploadedFile() imageFile,
    @Param("id") imageId: string,
    @User() user: JwtPayload
  ) {
    const userId = await this.imagesService.getRelatedEntityUserId(imageId);

    if (user.userId !== userId) {
      throw new UnauthorizedException();
    }

    const uploadedImage: any = await this.fileUploadService.upload(imageFile);
    const newImage: Prisma.ImageUpdateInput = {
      url: uploadedImage.Location,
    };
    return this.imagesService.update({
      where: { imageId },
      data: newImage,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async remove(@Param("id") imageId: string, @User() user: JwtPayload) {
    const userId = await this.imagesService.getRelatedEntityUserId(imageId);

    if (user.userId !== userId) {
      throw new UnauthorizedException();
    }

    return this.imagesService.delete({ imageId });
  }
}
