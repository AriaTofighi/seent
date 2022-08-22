import { Prisma } from "@prisma/client";
import {
  IsBoolean,
  IsDefined,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

export class CreatePostDto implements Prisma.PostCreateInput {
  @IsUUID()
  authorId: string;

  @IsString()
  body: string;

  @IsBoolean()
  isPublic: boolean;

  @IsUUID()
  @IsOptional()
  parentPostId?: string;

  images: any;
}
