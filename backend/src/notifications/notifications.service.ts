import { PrismaService } from "../orm/prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma, Notification } from "@prisma/client";
import { NotificationFindManyParams } from "./notifications.types";
import { createPaginator } from "utils/paginationUtils";
import { PaginatedResult } from "utils/types";

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  private readonly _include: Prisma.NotificationInclude = {
    sender: {
      select: {
        userId: true,
        username: true,
        name: true,
        images: {
          select: {
            imageId: true,
            url: true,
          },
          where: {
            type: "USER_AVATAR",
          },
        },
      },
    },
    post: {
      select: {
        postId: true,
        body: true,
      },
    },
  };

  async findOne(
    notificationWhereUniqueInput: Prisma.NotificationWhereUniqueInput
  ) {
    const notification = await this.prisma.notification.findUnique({
      where: notificationWhereUniqueInput,
    });
    return notification;
  }

  async findMany(params: NotificationFindManyParams) {
    const { page, perPage, where, orderBy } = params;
    const queryArgs = {
      where,
      orderBy,
      include: this._include,
    };

    // If roomId is null, then type should also not be MESSAGE.
    if (where.roomId === null) {
      queryArgs.where = {
        ...queryArgs.where,
        type: {
          not: "MESSAGE",
        },
      };
    }

    let result: PaginatedResult<Notification> | Notification[];

    if (page !== undefined) {
      const paginate = createPaginator({ perPage: perPage });
      result = await paginate<Notification, Prisma.NotificationFindManyArgs>(
        this.prisma.notification,
        queryArgs,
        { page: page }
      );
    } else {
      result = await this.prisma.notification.findMany(queryArgs);
    }

    return result;
  }

  async updateManyRead(notificationIds: string[], read: boolean) {
    return await this.prisma.notification.updateMany({
      where: {
        notificationId: {
          in: notificationIds,
        },
      },
      data: {
        read,
      },
    });
  }

  async create(data: Prisma.NotificationCreateInput) {
    return await this.prisma.notification.create({
      data,
    });
  }

  async delete(
    where: Prisma.NotificationWhereUniqueInput
  ): Promise<Notification> {
    return await this.prisma.notification.delete({
      where,
    });
  }
}
