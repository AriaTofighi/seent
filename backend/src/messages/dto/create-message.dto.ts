import { Prisma } from "@prisma/client";

export class CreateMessageDto implements Prisma.MessageCreateInput {
  roomUserId: string;
  body: string;
}
