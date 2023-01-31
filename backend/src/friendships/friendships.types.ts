import { Prisma } from "@prisma/client";
import { FindManyQuery } from "utils/types";

export class FriendshipFindManyParams extends FindManyQuery {
  where?: Prisma.FriendshipWhereInput;
  orderBy?: Prisma.FriendshipOrderByWithRelationInput;
}
