import {  Room } from "@prisma/client";

export class RoomEntity implements Room {
  roomId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<RoomEntity>) {
    Object.assign(this, partial);
  }

}
