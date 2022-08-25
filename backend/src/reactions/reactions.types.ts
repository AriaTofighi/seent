import { FindManyQuery } from "src/types";
import { Prisma } from "@prisma/client";

export class ReactionFindManyParams extends FindManyQuery {
  where?: Prisma.ReactionWhereInput;
  orderBy?: Prisma.ReactionOrderByWithRelationInput;
}
