import { CreateFriendshipDto } from "./create-friendship.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateFriendshipDto extends PartialType(CreateFriendshipDto) {}
