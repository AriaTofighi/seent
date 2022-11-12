import { Prisma } from "@prisma/client";

export type PostFindManyParams = {
  page?: number;
  perPage?: number;
  where?: Prisma.PostWhereInput;
  orderBy?: string;
  isChild?: boolean;
};
