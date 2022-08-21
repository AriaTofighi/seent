import { Prisma } from "@prisma/client";

export type ImageFindManyParams = {
  skip?: number;
  take?: number;
  cursor?: Prisma.ImageWhereUniqueInput;
  where?: Prisma.ImageWhereInput;
  orderBy?: Prisma.ImageOrderByWithRelationInput;
};
