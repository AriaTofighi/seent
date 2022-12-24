import { IsUUID } from "class-validator";

export class DeleteMessageDto {
  @IsUUID()
  messageId: string;
}
