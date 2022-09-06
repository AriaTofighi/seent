import { IsBoolean, IsOptional, IsString, IsUUID } from "class-validator";
import { FindManyQuery } from "utils/types";

export class FindPostsQueryDto extends FindManyQuery {
  @IsUUID()
  @IsOptional()
  postId?: string;

  @IsUUID()
  @IsOptional()
  parentPostId?: string;

  @IsBoolean()
  @IsOptional()
  isChild?: boolean;

  @IsUUID()
  @IsOptional()
  authorId?: string;

  @IsString()
  @IsOptional()
  orderBy?: string;
}
