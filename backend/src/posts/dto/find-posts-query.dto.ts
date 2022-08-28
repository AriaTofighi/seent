import { IsBoolean, IsOptional, IsUUID } from "class-validator";
import { FindManyQuery } from "src/types";

export class FindPostsQueryDto extends FindManyQuery {
  @IsUUID()
  @IsOptional()
  postId?: string;

  @IsUUID()
  @IsOptional()
  parentPostId?: string;

  @IsBoolean()
  @IsOptional()
  isChild: boolean;

  @IsUUID()
  @IsOptional()
  authorId: string;
}
