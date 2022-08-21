import { Image, ImageType } from "@prisma/client";

export class ImageEntity implements Image {
  imageId: string;
  url: string;
  type: ImageType;
  entityId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<ImageEntity>) {
    Object.assign(this, partial);
  }
}
