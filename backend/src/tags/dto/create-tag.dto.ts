import { Prisma } from "@prisma/client";
import { IsString, IsUUID } from "class-validator";

export class CreateTagDto implements Prisma.TagUncheckedCreateInput {
  @IsString()
  name: string;

  @IsUUID()
  creatorId: string;
}
