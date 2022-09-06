import { Injectable } from "@nestjs/common";
import { ImageType, Prisma } from "@prisma/client";
import { PrismaService } from "../orm/prisma.service";
import { ImageFindManyParams } from "./images.types";

@Injectable()
export class ImagesService {
  constructor(private prisma: PrismaService) {}

  async findOne(imageWhereUniqueInput: Prisma.ImageWhereUniqueInput) {
    const image = await this.prisma.image.findUnique({
      where: imageWhereUniqueInput,
      include: {
        user: {
          select: {
            userId: true,
          },
        },
        post: {
          select: {
            postId: true,
            authorId: true,
          },
        },
      },
    });
    return image;
  }

  async findMany(params: ImageFindManyParams) {
    const images = await this.prisma.image.findMany(params);
    return images;
  }

  async create(data: Prisma.ImageUncheckedCreateInput) {
    return await this.prisma.image.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.ImageWhereUniqueInput;
    data: Prisma.ImageUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.image.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.ImageWhereUniqueInput) {
    return this.prisma.image.delete({
      where,
    });
  }

  async getRelatedEntityUserId(imageId: string) {
    const image = await this.findOne({ imageId });
    const { user, post } = image;

    let userId: string | undefined;

    if (
      image.type === ImageType.USER_AVATAR ||
      image.type === ImageType.USER_BANNER
    ) {
      userId = user.userId;
    } else if (image.type === ImageType.POST) {
      userId = post.authorId;
    }
    return userId;
  }
}
