import { PrismaService } from "../orm/prisma.service";
import { Injectable } from "@nestjs/common";
import { ImageType, Prisma, User } from "@prisma/client";
import { UserFindManyParams } from "./users.types";
import { createPaginator } from "utils/paginationUtils";
import { UserEntity } from "./entities/user.entity";
import { PaginatedResult } from "utils/types";

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
        notifications: {
          where: {
            read: false,
            roomId: null,
          },
        },
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

    const queryArgs = {
      where,
      orderBy,
      include: this._include,
    };

    let result: PaginatedResult<User> | User[];
    if (page) {
      const paginate = createPaginator({ perPage: perPage });
      result = await paginate<User, Prisma.UserFindManyArgs>(
        this.prisma.user,
        queryArgs,
        { page: page }
      );
    } else {
      result = await this.prisma.user.findMany(queryArgs);
    }

    return result;
  }

  async getUserPostsReactionsCount(userId: string) {
    const result = await this.prisma.$queryRaw`
      SELECT COUNT(*) FROM "Reaction" WHERE "postId" IN (
        SELECT "postId" FROM "Post" WHERE "authorId" = ${userId}
      )
    `;

    return result[0].count;
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

  async count(where: Prisma.UserWhereInput) {
    return this.prisma.user.count({
      where,
    });
  }
}
