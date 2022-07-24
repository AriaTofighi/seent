import { Prisma } from "@prisma/client";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateReactionDto implements Prisma.ReactionCreateInput {
  @IsUUID()
  postId: string;

  @IsUUID()
  userId: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}
