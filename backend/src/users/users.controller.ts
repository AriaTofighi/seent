import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { User } from "./decorators/user.decorator";
import { FindUsersQueryDto } from "./dto/find-users-query.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";
import { UsersService } from "./users.service";

@UseInterceptors(ClassSerializerInterceptor)
@Controller("/api/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findMany(@Query() query: FindUsersQueryDto) {
    const { userId, username, email, name, page, perPage, search } = query;

    const result = await this.usersService.findMany({
      where: {
        userId,
        email,
        name: {
          contains: search,
          equals: name,
          mode: "insensitive",
        },
        username: {
          contains: search,
          equals: username,
          mode: "insensitive",
        },
      },
      page,
      perPage,
    });

    const userEntities = result.data.map((u) => new UserEntity(u));

    return { ...result, data: userEntities };
  }

  @Get(":id")
  async findOne(@Param("id") userId: string) {
    const user = await this.usersService.findOne({ userId });
    const userEntity = new UserEntity(user);
    return userEntity;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async update(
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
  async remove(@Param("id") userId: string, @User() user: UserEntity) {
    console.log(user);
    // Return an 400 status code on the next line to test the controller
    return "";

    // if (user.userId !== userId) {
    //   throw new UnauthorizedException();
    // }

    // return this.usersService.delete({ userId });
  }
}
