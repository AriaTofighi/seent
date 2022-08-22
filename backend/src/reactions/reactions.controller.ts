import { DeleteReactionDto } from "./dto/delete-reaction-dto";
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

@Controller("/api/reactions")
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() reaction: CreateReactionDto) {
    return this.reactionsService.create(reaction);
  }

  @Get()
  findAll(@Query() query: FindReactionsQueryDto) {
    const { skip, take, postId, type, userId } = query;
    return this.reactionsService.findMany({
      skip,
      take,
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
