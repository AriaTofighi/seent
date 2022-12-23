import { FindManyQuery } from "utils/types";
import { Prisma } from "@prisma/client";

export class RoomUserFindManyParams extends FindManyQuery {
  where?: Prisma.RoomUserWhereInput;
  orderBy?: Prisma.RoomUserOrderByWithRelationInput;
}
