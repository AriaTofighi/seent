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
import { FileUploadService } from "src/file-upload/file-upload.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ImageEntity } from "./entities/image.entity";
import { ImageType } from "@prisma/client";

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
      const userAvatars = await this.imagesService.findMany({
        where: { type: ImageType.USER_AVATAR },
      });
      if (userAvatars.length > 0) {
        throw new BadRequestException();
      }
    }
    const uploadedImage: any = await this.fileUploadService.upload(imageFile);
    const newImage = new ImageEntity({
      userId: image.userId,
      postId: image.postId,
      type: image.type,
      url: uploadedImage.Location,
    });
    return await this.imagesService.create(newImage);
  }

  @Get(":id")
  async findOne(@Param("id") imageId: string) {
    const image = await this.imagesService.findOne({ imageId });
    return image;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async update(
    @Param("id") imageId: string,
    @Body() updateImageDto: UpdateImageDto
  ) {
    return this.imagesService.update({
      where: { imageId },
      data: updateImageDto,
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
