import { IsBoolean, IsOptional, IsString, IsUUID } from "class-validator";

export class CreatePostDto {
  @IsUUID()
  authorId: string;

  @IsString()
  body: string;

  @IsBoolean()
  isPublic: boolean;

  @IsUUID()
  @IsOptional()
  parentPostId?: string;
}
