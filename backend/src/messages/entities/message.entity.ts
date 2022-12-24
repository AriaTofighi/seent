import { Message } from "@prisma/client";

export class MessageEntity implements Message {
  messageId: string;
  roomUserId: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<MessageEntity>) {
    Object.assign(this, partial);
  }
}
