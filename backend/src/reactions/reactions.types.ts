import { Prisma } from "@prisma/client";

export type ReactionFindManyParams = {
  skip?: number;
  take?: number;
  cursor?: Prisma.ReactionWhereUniqueInput;
  where?: Prisma.ReactionWhereInput;
  orderBy?: Prisma.ReactionOrderByWithRelationInput;
};
