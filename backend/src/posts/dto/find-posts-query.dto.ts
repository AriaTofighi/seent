import { Transform } from "class-transformer";
import {
  IsBoolean,
  IsBooleanString,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { FindManyQuery } from "utils/types";

export class FindPostsQueryDto extends FindManyQuery {
  @IsUUID()
  @IsOptional()
  postId?: string;

  @IsUUID()
  @IsOptional()
  parentPostId?: string;

  @IsBoolean()
  @Transform(({ value }) => value === "true")
  @IsOptional()
  isChild?: boolean;

  @IsUUID()
  @IsOptional()
  authorId?: string;

  @IsString()
  @IsOptional()
  orderBy?: string;
}
