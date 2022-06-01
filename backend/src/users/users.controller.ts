import { Prisma } from "@prisma/client";
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserFindManyQuery } from "./entities/user.entity";

@Controller("/api/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Get()
  findAll(@Query() query: UserFindManyQuery) {
    const { skip, take, userId, email, name } = query;
    return this.usersService.findMany({
      skip,
      take,
      where: { userId, email, name },
    });
  }

  @Get(":id")
  findOne(@Param("id") userId: string) {
    return this.usersService.findOne({ userId });
  }

  @Patch(":id")
  update(@Param("id") userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update({
      where: { userId },
      data: updateUserDto,
    });
  }

  @Delete(":id")
  remove(@Param("id") userId: string) {
    return this.usersService.delete({ userId });
  }
}
