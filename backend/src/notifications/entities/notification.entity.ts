import { Notification, NotificationType } from "@prisma/client";

export class NotificationEntity implements Notification {
  notificationId: string;
  type: NotificationType;
  recipientId: string;
  senderId: string;
  postId: string;
  roomId: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<NotificationEntity>) {
    Object.assign(this, partial);
  }
}
