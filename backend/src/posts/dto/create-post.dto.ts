import { IsOptional, IsString, IsUUID } from "class-validator";
import { ToBoolean } from "utils/validators";

export class CreatePostDto {
  @IsUUID()
  authorId: string;

  @IsString()
  body: string;

  @ToBoolean()
  isPublic: boolean;

  @IsUUID()
  @IsOptional()
  parentPostId?: string;

  @IsOptional()
  images: any;

  @IsOptional()
  tags: string;
}
