import { User } from "@prisma/client";

export class GetUserDto implements User {
  avatarId: string;
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
  password: string;
}
