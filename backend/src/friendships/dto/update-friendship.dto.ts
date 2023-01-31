import { CreateFriendshipDto } from "./create-friendship.dto";
import { OmitType, PartialType } from "@nestjs/mapped-types";

export class UpdateFriendshipDto extends PartialType(CreateFriendshipDto) {}
