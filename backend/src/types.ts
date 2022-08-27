import { PostEntity } from "./posts/entities/post.entity";
import { ReactionEntity } from "./reactions/entities/reaction.entity";
import { UserEntity } from "./users/entities/user.entity";
import { IsNumber, IsOptional, IsString } from "class-validator";

export { UserEntity, ReactionEntity, PostEntity };

export class FindManyQuery {
  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  perPage?: number;
}
