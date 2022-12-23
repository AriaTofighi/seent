import { IsOptional, IsString, IsUUID } from "class-validator";
import { FindManyQuery } from "utils/types";

export class FindRoomsQueryDto extends FindManyQuery {
  @IsUUID()
  @IsOptional()
  roomId?: string;

  @IsString()
  @IsOptional()
  title?: string;
}
