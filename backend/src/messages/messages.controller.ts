import { DeleteMessageDto } from "./dto/delete-message-dto";
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
import { MessagesService } from "./messages.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { FindMessagesQueryDto } from "./dto/find-messages-query.dto";

@Controller("/api/messages")
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() message: CreateMessageDto) {
    return this.messagesService.create(message);
  }

  @Get()
  findAll(@Query() query: FindMessagesQueryDto) {
    const { messageId, body, roomUserId, page, perPage } = query;
    return this.messagesService.findMany({
      page,
      perPage,
      where: { messageId, body, roomUserId },
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
