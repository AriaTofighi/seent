import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  forwardRef,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ImageType } from "@prisma/client";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { ImagesService } from "./../images/images.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { FindUsersQueryDto } from "./dto/find-users-query.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";
import { UsersService } from "./users.service";

@UseInterceptors(ClassSerializerInterceptor)
@Controller("/api/users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => ImagesService))
    private readonly imagesService: ImagesService
  ) {}

  @Post()
  async create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Get()
  async findMany(@Query() query: FindUsersQueryDto) {
    const { userId, email, name, page, perPage } = query;

    const result = await this.usersService.findMany({
      where: { userId, email, name },
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
  async remove(@Param("id") userId: string, @Req() req) {
    if (req.user.userId !== userId) {
      throw new UnauthorizedException();
    }

    return this.usersService.delete({ userId });
  }
}
