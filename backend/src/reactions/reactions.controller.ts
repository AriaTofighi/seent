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
import { ReactionsService } from "./reactions.service";
import { CreateReactionDto } from "./dto/create-reaction.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { FindReactionsQueryDto } from "./dto/find-reactions-query.dto";
import { NotificationsService } from "src/notifications/notifications.service";

@Controller("/api/reactions")
export class ReactionsController {
  constructor(
    private readonly reactionsService: ReactionsService,
    private readonly notificationsService: NotificationsService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() reaction: CreateReactionDto) {
    const createdReaction = await this.reactionsService.create(reaction);
    const reactionWithPostUser = await this.reactionsService.findOne({
      reactionId: createdReaction.reactionId,
    });

    await this.notificationsService.create({
      type: "LIKE",
      sender: {
        connect: {
          userId: reaction.userId,
        },
      },
      recipient: {
        connect: {
          userId: reactionWithPostUser.post.authorId,
        },
      },
      post: {
        connect: {
          postId: reaction.postId,
        },
      },
    });

    return createdReaction;
  }

  @Get()
  findAll(@Query() query: FindReactionsQueryDto) {
    const { postId, type, userId, page, perPage } = query;
    return this.reactionsService.findMany({
      page,
      perPage,
      where: { postId, type, userId },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async remove(@Param("id") reactionId: string, @Req() req: any) {
    console.log(reactionId);

    const reaction = await this.reactionsService.findOne({
      reactionId,
    });

    if (req.user.userId !== reaction.userId) {
      throw new UnauthorizedException();
    }

    return this.reactionsService.delete({
      reactionId,
    });
  }
}
