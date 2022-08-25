import { Prisma } from "@prisma/client";
import { FindManyQuery } from "src/types";

export class UserFindManyParams extends FindManyQuery {
  cursor?: Prisma.UserWhereUniqueInput;
  where?: Prisma.UserWhereInput;
  orderBy?: Prisma.UserOrderByWithRelationInput;
}
