import { Prisma } from "@prisma/client";
import {
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  isNumberString,
  IsString,
  Length,
} from "class-validator";

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsEmail()
  email: string;

  @Length(2, 70)
  name: string;

  @IsNotEmpty()
  password: string;

  @IsDate()
  birthday: Date;

  location?: string;
  bio?: string;
  gender?: string;
}
