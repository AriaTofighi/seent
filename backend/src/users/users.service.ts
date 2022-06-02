import { GetUserDto } from "./dto/get-user.dto";
import { PrismaService } from "./../prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { exclude } from "utils/modelHelpers";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<User | null> {
    const user: User = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
    return user;
  }

  async findMany(params: UserFindManyParams): Promise<GetUserDto[]> {
    const users = await this.prisma.user.findMany(params);
    return users;
  }

  async create(data: Prisma.UserCreateInput): Promise<GetUserDto> {
    return await this.prisma.user.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<GetUserDto> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<GetUserDto> {
    return this.prisma.user.delete({
      where,
    });
  }
}

export type UserFindManyParams = {
  skip?: number;
  take?: number;
  cursor?: Prisma.UserWhereUniqueInput;
  where?: Prisma.UserWhereInput;
  orderBy?: Prisma.UserOrderByWithRelationInput;
};
