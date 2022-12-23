import { FindManyQuery } from "utils/types";
import { Prisma } from "@prisma/client";

export class RoomFindManyParams extends FindManyQuery {
  where?: Prisma.RoomWhereInput;
  orderBy?: Prisma.RoomOrderByWithRelationInput;
}
