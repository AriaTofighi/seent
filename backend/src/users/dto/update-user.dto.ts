import { Prisma } from "@prisma/client";

export class UpdateUserDto implements Prisma.UserUpdateInput {
  email?: string;
  name?: string;
  birthday?: Date | string;
  location?: string;
  bio?: string;
  gender?: string;
}
