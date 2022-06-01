import { User } from "@prisma/client";

export class GetUserDto implements Omit<User, "password"> {
  email: string;
  birthday: Date;
  location: string;
  bio: string;
  gender: string;
  locked: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  name: string;
}
