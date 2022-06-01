import { IsBoolean, IsOptional, IsString, IsUUID } from "class-validator";

export class CreatePostDto {
  @IsUUID()
  authorId: string;

  @IsString()
  body: string;

  @IsBoolean()
  public: boolean;

  @IsUUID()
  @IsOptional()
  parentPostId?: string;
}
