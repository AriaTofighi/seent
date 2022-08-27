import { ImageEntity } from "./../../images/entities/image.entity";
import { Role, User } from "@prisma/client";
import { Exclude } from "class-transformer";

export class UserEntity implements User {
  userId: string;
  email: string;
  name: string;

  @Exclude()
  password: string;

  birthday: Date;
  location: string;
  bio: string;
  gender: string;
  locked: boolean;
  role: Role;
  createdAt: Date;
  updatedAt: Date;

  images: Partial<ImageEntity>[];

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
