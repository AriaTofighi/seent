import { IsUUID } from "class-validator";

export class DeleteReactionDto {
  @IsUUID()
  reactionId: string;
}
