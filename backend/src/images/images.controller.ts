import { UpdateImageDto } from "./dto/update-image.dto";
import { ImagesService } from "./images.service";
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
  Post,
  BadRequestException,
} from "@nestjs/common";
import { CreateImageDto } from "./dto/create-image.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { FileUploadService } from "src/file-upload.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ImageType, Prisma } from "@prisma/client";

@Controller("api/images")
export class ImagesController {
  constructor(
    private readonly imagesService: ImagesService,
    private readonly fileUploadService: FileUploadService
  ) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("image"))
  @Post()
  async create(@UploadedFile() imageFile, @Body() image: CreateImageDto) {
    if (image.type === ImageType.USER_AVATAR) {
      if (!image.userId) {
        throw new BadRequestException();
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

  @Get(":id")
  async findOne(@Param("id") imageId: string) {
    const image = await this.imagesService.findOne({ imageId });
    return image;
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("image"))
  @Patch(":id")
  async update(@UploadedFile() imageFile, @Param("id") imageId: string) {
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
  async remove(@Param("id") imageId: string, @Req() req) {
    const userId = this.imagesService.getRelatedEntityUserId(imageId);

    if (req.user.userId !== userId) {
      throw new UnauthorizedException();
    }

    return this.imagesService.delete({ imageId });
  }
}
