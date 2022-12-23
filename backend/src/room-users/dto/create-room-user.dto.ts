import { Prisma } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsBoolean, IsUUID } from "class-validator";

export class CreateRoomUserDto implements Prisma.RoomUserCreateInput {
  @IsUUID()
  roomId: string;

  @IsUUID()
  userId: string;

  @IsBoolean()
  @Transform(({ value }) => value === "true")
  isOwner: boolean;
}
