import { FriendshipStatus } from "@prisma/client";
import { IsOptional, IsString, IsUUID } from "class-validator";
import { FindManyQuery } from "utils/types";

export class FindFriendshipsQueryDto extends FindManyQuery {
  @IsUUID()
  @IsOptional()
  friendshipId?: FriendshipStatus;

  @IsUUID()
  @IsOptional()
  senderId?: string;

  @IsUUID()
  @IsOptional()
  recipientId?: string;

  @IsOptional()
  @IsString()
  status?: FriendshipStatus;
}
