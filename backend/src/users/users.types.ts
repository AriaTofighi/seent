import { Prisma } from "@prisma/client";
import { FindManyQuery } from "utils/types";

export class UserFindManyParams extends FindManyQuery {
  cursor?: Prisma.UserWhereUniqueInput;
  where?: Prisma.UserWhereInput;
  orderBy?: Prisma.UserOrderByWithRelationInput;
}
