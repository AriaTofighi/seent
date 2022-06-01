import { CreatePostDto } from "./create-post.dto";
import { OmitType, PartialType } from "@nestjs/mapped-types";

export class UpdatePostDto extends PartialType(
  OmitType(CreatePostDto, ["authorId"] as const)
) {}
