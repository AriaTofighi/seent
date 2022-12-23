import { Prisma } from "@prisma/client";
import { IsArray, IsString, IsUUID } from "class-validator";

export class CreateRoomDto implements Prisma.RoomCreateInput {
  @IsString()
  title: string;

  @IsArray()
  userIds: string[];

  @IsUUID()
  ownerId: string;
}
