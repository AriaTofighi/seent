import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class FindReactionsQueryDto {
  @IsNumber()
  @IsOptional()
  skip?: number;

  @IsNumber()
  @IsOptional()
  take?: number;

  @IsUUID()
  @IsOptional()
  postId?: string;

  @IsUUID()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsOptional()
  type?: string;
}
