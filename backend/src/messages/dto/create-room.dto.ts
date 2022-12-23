import { Prisma } from "@prisma/client";

export class CreateRoomDto implements Prisma.RoomCreateInput {
  title: string;
}
