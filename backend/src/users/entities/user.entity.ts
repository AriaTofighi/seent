import { User as PrismaUser } from "@prisma/client";

export class User implements PrismaUser {
  userId: string;
  email: string;
  name: string;
  password: string;
  birthday: Date;
  location: string | null;
  bio: string | null;
  gender: string | null;
  locked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class UserFindManyQuery {
  skip?: number;
  take?: number;
  userId?: string;
  email?: string;
  name?: string;
}
