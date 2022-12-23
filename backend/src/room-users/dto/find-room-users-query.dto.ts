import { Transform } from "class-transformer";
import { IsBoolean, IsOptional, IsUUID } from "class-validator";
import { FindManyQuery } from "utils/types";

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

  @IsBoolean()
  @Transform(({ value }) => value === "true")
  @IsOptional()
  isOwner?: boolean;
}
