import { ImageType } from "@prisma/client";
import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateImageDto {
  @IsNotEmpty()
  type: ImageType;

  @IsUUID()
  entityId: string;

  image: any;
}
