import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { Post } from "@nestjs/common/decorators";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateFriendshipDto } from "./dto/create-friendship.dto";
import { FindFriendshipsQueryDto } from "./dto/find-friendships-query.dto";
import { UpdateFriendshipDto } from "./dto/update-friendship.dto";
import { FriendshipsService } from "./friendships.service";

@Controller("api/friendships")
export class FriendshipsController {
  constructor(private readonly friendshipsService: FriendshipsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() friendship: CreateFriendshipDto) {
    const newFriendship = await this.friendshipsService.create(friendship);
    return newFriendship;
  }

  @UseGuards(JwtAuthGuard)
  @Get("/pair")
  async findOneByIdPair(
    @Query("userIdOne") userIdOne: string,
    @Query("userIdTwo") userIdTwo: string
  ) {
    const friendship = await this.friendshipsService.findOne({
      OR: [
        {
          AND: [{ senderId: userIdOne }, { recipientId: userIdTwo }],
        },
        {
          AND: [{ senderId: userIdTwo }, { recipientId: userIdOne }],
        },
      ],
    });

    if (!friendship) {
      throw new NotFoundException("Friendship not found");
    }

    return friendship;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findMany(@Query() query: FindFriendshipsQueryDto) {
    const { friendshipId, senderId, recipientId, status, page, perPage } =
      query;

    const friendships = await this.friendshipsService.findMany({
      where: {
        friendshipId,
        senderId,
        recipientId,
        status,
      },
      page,
      perPage,
    });
    return friendships;
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async findOneById(@Param("id") friendshipId: string) {
    const friendship = await this.friendshipsService.findOne({ friendshipId });
    if (!friendship) {
      throw new NotFoundException("Friendship not found");
    }
    return friendship;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async update(
    @Param("id") friendshipId: string,
    @Body() updateFriendshipDto: UpdateFriendshipDto
  ) {
    const { status } = updateFriendshipDto;
    return this.friendshipsService.update({
      where: { friendshipId },
      data: { status },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async remove(@Param("id") friendshipId: string, @Req() req) {
    return this.friendshipsService.delete({ friendshipId });
  }
}
