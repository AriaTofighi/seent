import { PrismaService } from "./../prisma.service";
import { Injectable } from "@nestjs/common";
import { ImageType, Prisma, User } from "@prisma/client";
import { UserFindManyParams } from "./users.types";
import { createPaginator } from "prisma-pagination";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      include: {
        images: {
          select: {
            imageId: true,
            url: true,
          },
          where: {
            type: ImageType.USER_AVATAR,
          },
        },
      },
    });
    return user;
  }

  async findMany(params: UserFindManyParams) {
    const { where, orderBy, page, perPage } = params;

    const paginate = createPaginator({ perPage: perPage });
    const result = await paginate<User, Prisma.UserFindManyArgs>(
      this.prisma.user,
      {
        where,
        orderBy,
        include: {
          images: {
            select: {
              imageId: true,
              url: true,
            },
            where: {
              type: ImageType.USER_AVATAR,
            },
          },
        },
      },
      { page: page }
    );

    return result;
  }

  async create(data: Prisma.UserCreateInput) {
    return await this.prisma.user.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({
      where,
    });
  }
}
