import { IsBoolean, IsString, IsUUID } from "class-validator";

export class CreatePostDto {
  @IsUUID()
  authorId: string;

  @IsString()
  body: string;

  @IsBoolean()
  public: boolean;

  @IsUUID()
  parentPostId?: string;
}
