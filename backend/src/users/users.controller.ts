import { ImageType } from "@prisma/client";
import { ImagesService } from "./../images/images.service";
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
  ClassSerializerInterceptor,
  UseInterceptors,
  forwardRef,
  Inject,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { FindUsersQueryDto } from "./dto/find-users-query.dto";
import { UserEntity } from "./entities/user.entity";

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
    const { skip, take, userId, email, name } = query;
    const users = await this.usersService.findMany({
      skip,
      take,
      where: { userId, email, name },
    });

    return users.map((u) => new UserEntity(u));
  }

  @Get(":id")
  async findOne(@Param("id") userId: string) {
    const user = await this.usersService.findOne({ userId });
    const images = await this.imagesService.findMany({
      where: { entityId: user.userId, type: ImageType.USER_AVATAR },
    });
    if (images.length > 1) {
      return new UserEntity(user);
    }
    const userWithAvatar = { ...user, image: images[0] };
    const userEntity = new UserEntity(userWithAvatar);
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
