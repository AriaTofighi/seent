import { FriendshipStatus } from "@prisma/client";
import { IsUUID } from "class-validator";

export class CreateFriendshipDto {
  @IsUUID()
  recipientId: string;

  @IsUUID()
  senderId: string;

  status: FriendshipStatus;
}
