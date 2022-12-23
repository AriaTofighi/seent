import { IsUUID } from "class-validator";

export class DeleteRoomUserDto {
  @IsUUID()
  roomId: string;
}
