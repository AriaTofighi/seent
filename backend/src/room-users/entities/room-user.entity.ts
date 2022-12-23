import { RoomUser } from "@prisma/client";

export class RoomUserEntity implements RoomUser {
  roomUserId: string;
  roomId: string;
  userId: string;
  isOwner: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<RoomUserEntity>) {
    Object.assign(this, partial);
  }
}
