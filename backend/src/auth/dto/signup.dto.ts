import { IsDate, IsEmail, IsNotEmpty, Length } from "class-validator";

export class SignUpDto {
  @IsEmail()
  email: string;

  @Length(2, 70)
  name: string;

  @IsNotEmpty()
  password: string;

  @IsDate()
  birthday: Date;
}
