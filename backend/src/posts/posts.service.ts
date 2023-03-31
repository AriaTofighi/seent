import { Prisma, Post, ImageType } from "@prisma/client";
import { PrismaService } from "../orm/prisma.service";
import { PostFindManyParams } from "./posts.types";
import { Injectable } from "@nestjs/common";
import { createPaginator } from "utils/paginationUtils";
import { PaginatedResult } from "utils/types";

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  private readonly POST_INCLUDES: Prisma.PostInclude = {
    author: {
      select: {
        name: true,
        username: true,
        userId: true,
        images: {
          where: {
            type: ImageType.USER_AVATAR,
          },
          select: {
            imageId: true,
            url: true,
          },
        },
      },
    },
    _count: {
      select: {
        childPosts: true,
      },
    },
    parentPost: {
      select: {
        author: {
          select: {
            name: true,
            username: true,
            userId: true,
            images: {
              where: {
                type: ImageType.USER_AVATAR,
              },
              select: {
                imageId: true,
                url: true,
              },
            },
          },
        },
        postId: true,
        body: true,
        authorId: true,
        createdAt: true,
        images: {
          select: {
            imageId: true,
            url: true,
            type: true,
          },
        },
        isPublic: true,
        parentPostId: true,
        reactions: {
          select: {
            userId: true,
            type: true,
          },
        },
      },
    },
    reactions: {
      select: {
        userId: true,
        type: true,
        user: {
          select: {
            name: true,
            username: true,
            images: {
              where: {
                type: ImageType.USER_AVATAR,
              },
            },
          },
        },
        postId: true,
        reactionId: true,
      },
    },
    images: {
      select: {
        imageId: true,
        url: true,
        type: true,
      },
    },
  };

  async findOne(postWhereUniqueInput: Prisma.PostWhereUniqueInput) {
    const post = await this.prisma.post.findUnique({
      where: postWhereUniqueInput,
      include: this.POST_INCLUDES,
    });

    return post;
  }

  async findMany(params: PostFindManyParams) {
    const { where, orderBy, page, perPage, isChild } = params;
    const { calcedWhere, calcedOrderBy } = this.getFilters(where, orderBy);
    if (isChild !== undefined) {
      if (isChild) {
        calcedWhere.parentPostId = {
          not: null,
        };
      } else {
        calcedWhere.parentPostId = null;
      }
    }

    const queryArgs = {
      where: calcedWhere,
      orderBy: calcedOrderBy,
      include: this.POST_INCLUDES,
    };

    let result: PaginatedResult<Post> | Post[];
    if (page) {
      const paginate = createPaginator({ perPage: perPage });
      result = await paginate<Post, Prisma.PostFindManyArgs>(
        this.prisma.post,
        queryArgs,
        { page: page }
      );
    } else {
      result = await this.prisma.post.findMany(queryArgs);
    }
    return result;
  }

  async create(data: Prisma.PostCreateInput) {
    return this.prisma.post.create({
      data,
      include: {
        parentPost: {
          select: {
            author: {
              select: {
                userId: true,
              },
            },
          },
        },
      },
    });
  }

  async update(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { where, data } = params;
    return this.prisma.post.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({
      where,
    });
  }

  async getDepth(postId: string) {
    let depth = 0;
    const post = await this.findOne({ postId });
    let curParentPost = post.parentPost;
    while (curParentPost) {
      const post = await this.findOne({ postId: curParentPost.postId });
      depth++;
      curParentPost = post.parentPost;
    }
    return depth;
  }

  getFilters(
    where: Prisma.PostWhereInput,
    orderBy: string
  ): {
    calcedOrderBy: Prisma.Enumerable<Prisma.PostOrderByWithRelationInput>;
    calcedWhere: Prisma.PostWhereInput;
  } {
    const calcedOrderBy = [];
    if (orderBy) {
      if (orderBy === "new") {
        calcedOrderBy.push({ createdAt: "desc" });
      } else if (orderBy === "old") {
        calcedOrderBy.push({ createdAt: "asc" });
      } else if (orderBy.startsWith("top")) {
        calcedOrderBy.push({
          reactions: {
            _count: "desc",
          },
        });
        const startDate = new Date();
        const now = new Date();
        let daysAgo = 0;
        if (orderBy !== "top-all") {
          if (orderBy === "top-day") {
            daysAgo = 1;
          } else if (orderBy === "top-week") {
            daysAgo = 6;
          } else if (orderBy === "top-month") {
            daysAgo = 29;
          } else if (orderBy === "top-year") {
            daysAgo = 364;
          }

          startDate.setDate(startDate.getDate() - daysAgo);
          where.createdAt = {
            gte: startDate,
            lte: now,
          };
        }
      }
    }
    // Needed to prevent duplicate entities in result
    calcedOrderBy.push({ postId: "asc" });

    return {
      calcedWhere: where,
      calcedOrderBy,
    };
  }
}
