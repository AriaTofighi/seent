import { FriendshipStatus } from "@prisma/client";

export class CreateFriendshipDto {
  recipientId: string;
  senderId: string;
  status: FriendshipStatus;
}
