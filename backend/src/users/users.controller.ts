import { Prisma } from "@prisma/client";
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("/api/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findMany({});
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne({ userId: id });
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateUserDto: Prisma.UserUpdateInput
  ) {
    return this.usersService.update({
      where: { userId: id },
      data: updateUserDto,
    });
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.delete({ userId: id });
  }
}
