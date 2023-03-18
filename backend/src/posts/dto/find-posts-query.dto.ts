import { IsOptional, IsString, IsUUID } from "class-validator";
import { FindManyQuery } from "utils/types";
import { ToBoolean } from "utils/validators";

export class FindPostsQueryDto extends FindManyQuery {
  @IsUUID()
  @IsOptional()
  postId?: string;

  @IsUUID()
  @IsOptional()
  parentPostId?: string;

  @ToBoolean()
  @IsOptional()
  isChild?: boolean;

  @IsUUID()
  @IsOptional()
  authorId?: string;

  @IsString()
  @IsOptional()
  orderBy?: string;

  @IsString()
  @IsOptional()
  search?: string;
}
