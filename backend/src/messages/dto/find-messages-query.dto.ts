import { IsOptional, IsString, IsUUID } from "class-validator";
import { FindManyQuery } from "utils/types";

export class FindMessagesQueryDto extends FindManyQuery {
  @IsUUID()
  @IsOptional()
  messageId?: string;

  @IsUUID()
  @IsOptional()
  roomUserId?: string;

  @IsString()
  @IsOptional()
  body?: string;

  @IsUUID()
  @IsOptional()
  roomId?: string;
}
