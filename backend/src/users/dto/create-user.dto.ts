import { Prisma } from "@prisma/client";
import { Transform } from "class-transformer";
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  NotContains,
} from "class-validator";

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsEmail()
  email: string;

  @Length(2, 70)
  name: string;

  @IsString()
  @IsNotEmpty()
  @NotContains(" ")
  @Transform(({ value }) => value?.trim())
  @Length(3, 25)
  username: string;

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
