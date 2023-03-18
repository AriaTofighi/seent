import { FindManyQuery } from "utils/types";
import { Prisma } from "@prisma/client";

export class NotificationFindManyParams extends FindManyQuery {
  where?: Prisma.NotificationWhereInput;
  orderBy?: Prisma.NotificationOrderByWithRelationInput;
}
