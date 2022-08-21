import { ReactionType } from "@prisma/client";
import { IsOptional, IsString, IsUUID } from "class-validator";
import { FindManyQuery } from "src/types";

export class FindReactionsQueryDto extends FindManyQuery {
  @IsUUID()
  @IsOptional()
  reactionId?: string;

  @IsUUID()
  @IsOptional()
  postId?: string;

  @IsUUID()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsOptional()
  type?: ReactionType;
}
