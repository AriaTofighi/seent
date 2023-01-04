import { IsDate, IsEmail, IsString, Length } from "class-validator";

export class SignUpDto {
  @IsEmail()
  email: string;

  @Length(2, 70)
  name: string;

  @Length(2, 30)
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsDate()
  birthday: Date;
}
