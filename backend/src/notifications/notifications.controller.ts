import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  UseGuards,
  UnauthorizedException,
  Param,
} from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { FindNotificationsQueryDto } from "./dto/find-notifications-query.dto";
import { Patch } from "@nestjs/common/decorators";
import { JwtPayload } from "utils/types";
import { User } from "src/users/decorators/user.decorator";
import { Notification } from "@prisma/client";

@Controller("/api/notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() notification: CreateNotificationDto,
    @User() user: JwtPayload
  ) {
    const { type, roomId, postId, senderId, recipientId } = notification;

    if (user.userId !== senderId) {
      throw new UnauthorizedException();
    }

    return this.notificationsService.create({
      type,
      room: {
        connect: {
          roomId,
        },
      },
      post: {
        connect: {
          postId,
        },
      },
      sender: {
        connect: {
          userId: senderId,
        },
      },
      recipient: {
        connect: {
          userId: recipientId,
        },
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: FindNotificationsQueryDto, @User() user: JwtPayload) {
    const {
      notificationId,
      roomId,
      senderId,
      recipientId,
      postId,
      type,
      read,
      page,
      perPage,
    } = query;

    if (recipientId !== user.userId) {
      throw new UnauthorizedException();
    }

    return this.notificationsService.findMany({
      page,
      perPage,
      where: {
        postId,
        type,
        recipientId,
        roomId: roomId === "null" ? null : roomId,
        senderId,
        notificationId,
        read,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateManyRead(
    @Body()
    updateManyRead: {
      notificationIds: string[];
      read: boolean;
    },
    @User() user: JwtPayload
  ) {
    const { notificationIds } = updateManyRead;

    const notifications = (await this.notificationsService.findMany({
      where: {
        notificationId: {
          in: notificationIds,
        },
        recipientId: user.userId,
      },
    })) as Notification[];

    for (const notification of notifications) {
      if (notification.recipientId !== user.userId) {
        throw new UnauthorizedException();
      }
    }

    return this.notificationsService.updateManyRead(notificationIds, true);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async remove(@Param("id") notificationId: string, @User() user: JwtPayload) {
    const notification = await this.notificationsService.findOne({
      notificationId,
    });

    if (user.userId !== notification.senderId) {
      throw new UnauthorizedException();
    }

    return this.notificationsService.delete({
      notificationId,
    });
  }
}
