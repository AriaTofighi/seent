import { IsOptional, IsUUID } from "class-validator";
import { FindManyQuery } from "utils/types";
import { ToBoolean } from "utils/validators";

export class FindRoomUsersQueryDto extends FindManyQuery {
  @IsUUID()
  @IsOptional()
  roomUserId?: string;

  @IsUUID()
  @IsOptional()
  userId?: string;

  @IsUUID()
  @IsOptional()
  roomId?: string;

  @ToBoolean()
  @IsOptional()
  isOwner?: boolean;
}
