import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Query,
  UseGuards,
} from "@nestjs/common";
import { Post } from "@nestjs/common/decorators";
import { UnauthorizedException } from "@nestjs/common/exceptions";
import { NotificationType } from "@prisma/client";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { NotificationsService } from "src/notifications/notifications.service";
import { User } from "src/users/decorators/user.decorator";
import { JwtPayload } from "utils/types";
import { CreateFriendshipDto } from "./dto/create-friendship.dto";
import { FindFriendshipsQueryDto } from "./dto/find-friendships-query.dto";
import { UpdateFriendshipDto } from "./dto/update-friendship.dto";
import { FriendshipsService } from "./friendships.service";

@Controller("api/friendships")
export class FriendshipsController {
  constructor(
    private readonly friendshipsService: FriendshipsService,
    private readonly notificationsService: NotificationsService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() friendship: CreateFriendshipDto,
    @User() user: JwtPayload
  ) {
    if (friendship.senderId !== user.userId) {
      throw new UnauthorizedException();
    }

    const newFriendship = await this.friendshipsService.create(friendship);

    await this.notificationsService.create({
      type: NotificationType.FRIEND_REQUEST,
      sender: {
        connect: {
          userId: newFriendship.senderId,
        },
      },
      recipient: {
        connect: {
          userId: newFriendship.recipientId,
        },
      },
    });

    return newFriendship;
  }

  @UseGuards(JwtAuthGuard)
  @Get("/pair")
  async findOneByIdPair(
    @Query("userIdOne") userIdOne: string,
    @Query("userIdTwo") userIdTwo: string
  ) {
    const friendship = await this.friendshipsService.findOneByPair(
      userIdOne,
      userIdTwo
    );

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
    @Body() updateFriendshipDto: UpdateFriendshipDto,
    @User() user: JwtPayload
  ) {
    const { status } = updateFriendshipDto;

    const friendship = await this.friendshipsService.findOne({ friendshipId });

    if (friendship.recipientId !== user.userId) {
      throw new UnauthorizedException();
    }

    const updatedFriendship = await this.friendshipsService.update({
      where: { friendshipId },
      data: { status },
    });

    if (status === "ACCEPTED") {
      await this.notificationsService.create({
        type: NotificationType.FRIEND_ACCEPT,
        sender: {
          connect: {
            userId: updatedFriendship.recipientId,
          },
        },
        recipient: {
          connect: {
            userId: updatedFriendship.senderId,
          },
        },
      });
    }

    return updatedFriendship;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async remove(@Param("id") friendshipId: string, @User() user: JwtPayload) {
    const friendship = await this.friendshipsService.findOne({ friendshipId });

    if (friendship.senderId !== user.userId) {
      throw new UnauthorizedException();
    }

    return this.friendshipsService.delete({ friendshipId });
  }
}
