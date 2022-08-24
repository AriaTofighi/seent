import { PostEntity } from "./posts/entities/post.entity";
import { ReactionEntity } from "./reactions/entities/reaction.entity";
import { IsNumber, IsOptional } from "class-validator";
import { UserEntity } from "./users/entities/user.entity";

export { UserEntity, ReactionEntity, PostEntity };

export class FindManyQuery {
  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  perPage?: number;
}
