import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  UseGuards,
  Req,
  UnauthorizedException,
  Param,
} from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { FindNotificationsQueryDto } from "./dto/find-notifications-query.dto";
import { Patch } from "@nestjs/common/decorators";

@Controller("/api/notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() notification: CreateNotificationDto) {
    const { type, roomId, postId, senderId, recipientId } = notification;
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

  @Get()
  findAll(@Query() query: FindNotificationsQueryDto) {
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
    }
  ) {
    return this.notificationsService.updateManyRead(
      updateManyRead.notificationIds,
      true
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async remove(@Param("id") notificationId: string, @Req() req: any) {
    const notification = await this.notificationsService.findOne({
      notificationId,
    });

    if (req.user.userId !== notification.senderId) {
      throw new UnauthorizedException();
    }

    return this.notificationsService.delete({
      notificationId,
    });
  }
}
