import { Prisma, ReactionType } from "@prisma/client";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateReactionDto implements Prisma.ReactionCreateInput {
  reactionId?: string;
  post: Prisma.PostCreateNestedOneWithoutReactionsInput;
  user: Prisma.UserCreateNestedOneWithoutReactionsInput;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  @IsUUID()
  postId: string;

  @IsUUID()
  userId: string;

  @IsString()
  @IsNotEmpty()
  type: ReactionType;
}
