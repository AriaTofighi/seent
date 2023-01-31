import { Friendship, FriendshipStatus } from "@prisma/client";

export class FriendshipEntity implements Friendship {
  friendshipId: string;
  recipientId: string;
  senderId: string;
  status: FriendshipStatus;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<FriendshipEntity>) {
    Object.assign(this, partial);
  }
}
