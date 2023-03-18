import { NotificationType } from "@prisma/client";
import { IsOptional, IsString, IsUUID } from "class-validator";
import { FindManyQuery } from "utils/types";
import { ToBoolean } from "utils/validators";

export class FindNotificationsQueryDto extends FindManyQuery {
  @IsUUID()
  @IsOptional()
  notificationId?: string;

  @IsUUID()
  @IsOptional()
  postId?: string;

  @IsOptional()
  roomId?: string | null;

  @IsUUID()
  @IsOptional()
  recipientId?: string;

  @IsUUID()
  @IsOptional()
  senderId?: string;

  @ToBoolean()
  @IsOptional()
  read?: boolean;

  @IsString()
  @IsOptional()
  type?: NotificationType;
}
