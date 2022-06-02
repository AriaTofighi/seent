import { Prisma } from "@prisma/client";
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
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

  @IsString()
  @IsOptional()
  location?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  gender?: string;
}
