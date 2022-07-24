import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
  UnauthorizedException,
} from "@nestjs/common";
import { ReactionsService } from "./reactions.service";
import { CreateReactionDto } from "./dto/create-reaction.dto";
import { UpdateReactionDto } from "./dto/update-reaction.dto";
import { exclude } from "utils/modelHelpers";
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

  // @Get(":id")
  // async findOne(@Param("id") reactionId: string) {
  //   const reaction = await this.reactionsService.findOne({ reactionId });
  //   return reaction;
  // }

  // @UseGuards(JwtAuthGuard)
  // @Patch(":id")
  // update(
  //   @Param("id") reactionId: string,
  //   @Body() updateReactionDto: UpdateReactionDto,
  //   @Req() req
  // ) {
  //   if (req.reaction.reactionId !== reactionId) {
  //     throw new UnauthorizedException();
  //   }

  //   return this.reactionsService.update({
  //     where: { reactionId },
  //     data: updateReactionDto,
  //   });
  // }

  // @UseGuards(JwtAuthGuard)
  // @Delete(":id")
  // remove(@Param("id") reactionId: string, @Req() req) {
  //   if (req.reaction.reactionId !== reactionId) {
  //     throw new UnauthorizedException();
  //   }

  //   return this.reactionsService.delete({ reactionId });
  // }
}
