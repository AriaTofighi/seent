import { PrismaService } from "./../prisma.service";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { ImageType, Prisma } from "@prisma/client";
import { ImageFindManyParams } from "./images.types";
import { PostsService } from "src/posts/posts.service";
import { UsersService } from "src/users/users.service";

@Injectable()
export class ImagesService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => PostsService))
    private readonly postsService: PostsService,
    private readonly usersService: UsersService
  ) {}

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

  async uploadToS3(url: string) {
    return "uploadedURL";
  }

  async getRelatedEntityUserId(imageId: string) {
    const image = await this.findOne({ imageId });
    const { entityId } = image;

    let userId: string | undefined;

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
    return userId;
  }
}
