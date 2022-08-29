import { CreatePostDto } from "./posts/dto/create-post.dto";
import { ImageType } from "@prisma/client";
import { PostEntity } from "./posts/entities/post.entity";
import { ReactionEntity } from "./reactions/entities/reaction.entity";
import { UserEntity } from "./users/entities/user.entity";
import { IsNumber, IsOptional } from "class-validator";

export { UserEntity, ReactionEntity, PostEntity, ImageType, CreatePostDto };

export class FindManyQuery {
  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  perPage?: number;
}
