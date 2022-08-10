import { IsUUID } from "class-validator";

export class DeleteReactionDto {
  @IsUUID()
  postId: string;

  @IsUUID()
  userId: string;
}
