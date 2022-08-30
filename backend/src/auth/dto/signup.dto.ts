import { IsDate, IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class SignUpDto {
  @IsEmail()
  email: string;

  @Length(2, 70)
  name: string;

  @IsString()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsDate()
  birthday: Date;
}
