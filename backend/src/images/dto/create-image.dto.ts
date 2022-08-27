import { ImageType } from "@prisma/client";
import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateImageDto {
  @IsNotEmpty()
  type: ImageType;

  @IsUUID()
  @IsOptional()
  userId?: string;

  @IsUUID()
  @IsOptional()
  postId?: string;

  image: any;
}
