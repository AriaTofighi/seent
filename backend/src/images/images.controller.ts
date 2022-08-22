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
} from "@nestjs/common";
import { CreateImageDto } from "./dto/create-image.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller("api/images")
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @UseGuards(JwtAuthGuard)
  create(@Body() image: CreateImageDto) {
    return this.imagesService.create(image);
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
