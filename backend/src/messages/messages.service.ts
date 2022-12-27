import { PrismaService } from "../orm/prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma, Message } from "@prisma/client";
import { MessageFindManyParams } from "./messages.types";
import { createPaginator } from "utils/paginationUtils";
import { PaginatedResult } from "utils/types";

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  private readonly _include: Prisma.MessageInclude = {
    roomUser: {
      select: {
        user: {
          select: {
            userId: true,
            name: true,
            username: true,
            images: {
              select: {
                url: true,
              },
              where: {
                type: "USER_AVATAR",
              },
            },
          },
        },
      },
    },
  };

  async findOne(messageWhereUniqueInput: Prisma.MessageWhereUniqueInput) {
    const message = await this.prisma.message.findUnique({
      where: messageWhereUniqueInput,
    });
    return message;
  }

  async findMany(params: MessageFindManyParams) {
    const { page, perPage, where, orderBy } = params;

    const queryArgs = {
      where,
      orderBy,
      include: this._include,
    };

    let result: PaginatedResult<Message> | Message[];
    if (page) {
      const paginate = createPaginator({ perPage: perPage });
      result = await paginate<Message, Prisma.MessageFindManyArgs>(
        this.prisma.post,
        queryArgs,
        { page: page }
      );
    } else {
      result = await this.prisma.message.findMany(queryArgs);
    }

    return result;
  }

  async create(data: Prisma.MessageCreateInput) {
    console.log(data);
    return await this.prisma.message.create({
      data,
    });
  }

  async delete(where: Prisma.MessageWhereUniqueInput): Promise<Message> {
    return await this.prisma.message.delete({
      where,
    });
  }
}
