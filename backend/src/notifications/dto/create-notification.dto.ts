import { NotificationType } from "@prisma/client";
import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateNotificationDto {
  @IsUUID()
  recipientId: string;

  @IsUUID()
  senderId: string;

  @IsOptional()
  postId: string;

  @IsOptional()
  roomId: string;

  @IsNotEmpty()
  type: NotificationType;
}
