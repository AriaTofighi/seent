import { FindManyQuery } from "utils/types";
import { Prisma } from "@prisma/client";

export class TagFindManyParams extends FindManyQuery {
  where?: Prisma.TagWhereInput;
  orderBy?: Prisma.TagOrderByWithRelationInput;
}
