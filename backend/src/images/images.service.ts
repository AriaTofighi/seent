import { PrismaService } from "./../prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { ImageFindManyParams } from "./images.types";

@Injectable()
export class ImagesService {
  constructor(private prisma: PrismaService) {}

  async findOne(imageWhereUniqueInput: Prisma.ImageWhereUniqueInput) {
    const image = await this.prisma.image.findUnique({
      where: imageWhereUniqueInput,
    });
    return image;
  }

  async findMany(params: ImageFindManyParams) {
    const images = await this.prisma.image.findMany(params);
    return images;
  }

  async create(data: Prisma.ImageCreateInput) {
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
}
