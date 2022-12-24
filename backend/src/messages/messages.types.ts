import { FindManyQuery } from "utils/types";
import { Prisma } from "@prisma/client";

export class MessageFindManyParams extends FindManyQuery {
  where?: Prisma.MessageWhereInput;
  orderBy?: Prisma.MessageOrderByWithRelationInput;
}
