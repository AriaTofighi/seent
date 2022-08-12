import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

export class FindUsersQueryDto {
  @IsNumber()
  @IsOptional()
  skip?: number;

  @IsNumber()
  @IsOptional()
  take?: number;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsUUID()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsOptional()
  name?: string;
}
