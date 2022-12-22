import { PrismaService } from "../orm/prisma.service";
import { Injectable } from "@nestjs/common";
import { ImageType, Prisma, User } from "@prisma/client";
import { UserFindManyParams } from "./users.types";
import { createPaginator } from "utils/paginationUtils";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  private readonly _include: Prisma.UserInclude = {
    images: {
      select: {
        imageId: true,
        url: true,
      },
      where: {
        type: ImageType.USER_AVATAR,
      },
    },
    _count: {
      select: {
        reactions: true,
      },
    },
  };

  async findOne(where: Prisma.UserWhereUniqueInput) {
    const user = await this.prisma.user.findUnique({
      where,
      include: this._include,
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
        include: this._include,
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
    return new UserEntity(
      await this.prisma.user.update({
        data,
        where,
      })
    );
  }

  async delete(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({
      where,
    });
  }
}
