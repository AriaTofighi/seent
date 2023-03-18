import { Prisma } from "@prisma/client";
import { IsUUID } from "class-validator";
import { ToBoolean } from "utils/validators";

export class CreateRoomUserDto implements Prisma.RoomUserCreateInput {
  @IsUUID()
  roomId: string;

  @IsUUID()
  userId: string;

  @ToBoolean()
  isOwner: boolean;
}
