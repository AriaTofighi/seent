import { Controller, Get, Post, Body, Query, UseGuards } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { FindMessagesQueryDto } from "./dto/find-messages-query.dto";
import { NotificationsService } from "src/notifications/notifications.service";
import { NotificationType } from "@prisma/client";
import { User } from "src/users/decorators/user.decorator";
import { JwtPayload } from "utils/types";
import { UnauthorizedException } from "@nestjs/common/exceptions";

@Controller("/api/messages")
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly notificationsService: NotificationsService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() message: CreateMessageDto, @User() user: JwtPayload) {
    const { roomUserId, body } = message;

    const newMessage = await this.messagesService.create({
      roomUser: { connect: { roomUserId } },
      body,
    });

    if (
      !newMessage.roomUser.room.roomUsers.some(
        (roomUser) => roomUser.userId === user.userId
      )
    ) {
      throw new UnauthorizedException();
    }

    for (const user of newMessage.roomUser.room.roomUsers) {
      if (user.userId !== newMessage.roomUser.userId) {
        await this.notificationsService.create({
          type: NotificationType.MESSAGE,
          room: {
            connect: {
              roomId: newMessage.roomUser.room.roomId,
            },
          },
          sender: {
            connect: {
              userId: newMessage.roomUser.userId,
            },
          },
          recipient: {
            connect: {
              userId: user.userId,
            },
          },
          read: false,
        });
      }
    }

    return newMessage;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query() query: FindMessagesQueryDto,
    @User() user: JwtPayload
  ) {
    const { roomId, page, perPage } = query;

    const messages = (await this.messagesService.findMany({
      where: { roomUser: { roomId } },
    })) as any[];

    if (
      !messages.some((message) =>
        message.roomUser.room.roomUsers.some(
          (roomUser) => roomUser.userId === user.userId
        )
      )
    ) {
      throw new UnauthorizedException();
    }

    return this.messagesService.findMany({
      page,
      perPage,
      where: {
        roomUser: {
          roomId,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
