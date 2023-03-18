import { Controller, Get, Post, Body, Query, UseGuards } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { FindMessagesQueryDto } from "./dto/find-messages-query.dto";
import { NotificationsService } from "src/notifications/notifications.service";
import { NotificationType } from "@prisma/client";

@Controller("/api/messages")
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly notificationsService: NotificationsService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() message: CreateMessageDto) {
    const { roomUserId, body } = message;

    const newMessage = await this.messagesService.create({
      roomUser: { connect: { roomUserId } },
      body,
    });

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

  @Get()
  findAll(@Query() query: FindMessagesQueryDto) {
    const { messageId, body, roomUserId, roomId, page, perPage } = query;
    return this.messagesService.findMany({
      page,
      perPage,
      where: {
        messageId,
        body,
        roomUserId,
        roomUser: {
          roomId,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  //   @UseGuards(JwtAuthGuard)
  //   @Delete(":id")
  //   async remove(@Param("id") messageId: string, @Req() req: any) {
  //     const message = await this.messagesService.findOne({
  //       messageId,
  //     });

  //     if (req.user.userId !== message.messageUser.userId) {
  //       throw new UnauthorizedException();
  //     }

  //     return this.messagesService.delete({
  //       messageId,
  //     });
  //   }
}
