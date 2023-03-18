import { Prisma } from "@prisma/client";
import { IsOptional, IsString, IsUUID } from "class-validator";
import { ToBoolean } from "utils/validators";

export class CreatePostDto implements Prisma.PostCreateInput {
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
}
