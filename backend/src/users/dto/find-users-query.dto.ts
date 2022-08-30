import { IsEmail, IsOptional, IsString, IsUUID } from "class-validator";
import { FindManyQuery } from "src/types";

export class FindUsersQueryDto extends FindManyQuery {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsUUID()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  username?: string;
}
