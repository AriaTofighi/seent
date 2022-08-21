import { ImageType, Prisma } from "@prisma/client";

export class CreateImageDto implements Prisma.ImageCreateInput {
  imageId?: string;
  url: string;
  type: ImageType;
  entityId: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
