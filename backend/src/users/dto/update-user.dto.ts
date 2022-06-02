import { CreateUserDto } from "./create-user.dto";
import { OmitType } from "@nestjs/mapped-types";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ["email"] as const)
) {}
