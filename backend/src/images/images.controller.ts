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
import { ImageType } from "@prisma/client";
import { PostsService } from "src/posts/posts.service";
import { UsersService } from "src/users/users.service";

@Controller("api/images")
export class ImagesController {
  constructor(
    private readonly imagesService: ImagesService,
    private readonly postsService: PostsService,
    private readonly usersService: UsersService
  ) {}

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
    const image = await this.imagesService.findOne({ imageId });
    const { entityId } = image;

    let userId;
    if (
      image.type === ImageType.USER_AVATAR ||
      image.type === ImageType.USER_BANNER
    ) {
      const user = await this.usersService.findOne({ userId: entityId });
      userId = user.userId;
    } else if (image.type === ImageType.POST) {
      const post = await this.postsService.findOne({ postId: entityId });
      userId = post.authorId;
    }

    if (req.user.userId !== userId) {
      throw new UnauthorizedException();
    }

    return this.imagesService.delete({ imageId });
  }
}
