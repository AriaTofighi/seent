import { IsOptional, IsString } from "class-validator";
import { FindManyQuery } from "utils/types";

export class FindTagsQueryDto extends FindManyQuery {
  @IsString()
  @IsOptional()
  sortBy?: string;

  @IsString()
  @IsOptional()
  search?: string;
}
