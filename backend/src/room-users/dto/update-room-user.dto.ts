import { PartialType } from "@nestjs/swagger";
import { CreateRoomUserDto } from "./create-room-user.dto";

export class UpdateRoomUserDto extends PartialType(CreateRoomUserDto) {}
