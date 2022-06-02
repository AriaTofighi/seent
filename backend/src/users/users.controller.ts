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
  UseGuards,
  Req,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserFindManyQuery } from "./entities/user.entity";
import { exclude } from "utils/modelHelpers";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

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
  async findOne(@Param("id") userId: string) {
    const user = await this.usersService.findOne({ userId });
    const userWithoutPassword = exclude(user, "password");
    return userWithoutPassword;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(
    @Param("id") userId: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req
  ) {
    if (req.user.userId !== userId) {
      throw new UnauthorizedException();
    }

    return this.usersService.update({
      where: { userId },
      data: updateUserDto,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") userId: string, @Req() req) {
    if (req.user.userId !== userId) {
      throw new UnauthorizedException();
    }

    return this.usersService.delete({ userId });
  }
}
