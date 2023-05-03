import {
  Prisma,
  Post,
  ImageType,
  FriendshipStatus,
  User,
} from "@prisma/client";
import { PrismaService } from "../orm/prisma.service";
import { PostFindManyParams } from "./posts.types";
import { Injectable } from "@nestjs/common";
import { createPaginator } from "utils/paginationUtils";
import { FriendshipsService } from "src/friendships/friendships.service";

@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
    private readonly friendshipsService: FriendshipsService
  ) {}

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
    postTags: {
      select: {
        tag: {
          select: {
            tagId: true,
            name: true,
          },
        },
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
    const { calcedWhere, calcedOrderBy } = this.getFilters(
      where,
      orderBy,
      isChild
    );

    const queryArgs = {
      where: calcedWhere,
      orderBy: calcedOrderBy,
      include: this.POST_INCLUDES,
    };

    const result = page
      ? await this.paginateResults(queryArgs, page, perPage)
      : await this.prisma.post.findMany(queryArgs);

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
    orderBy: string,
    isChild: boolean | undefined
  ): {
    calcedOrderBy: Prisma.Enumerable<Prisma.PostOrderByWithRelationInput>;
    calcedWhere: Prisma.PostWhereInput;
  } {
    const calcedOrderBy = this.calculateOrderBy(orderBy, where);
    const calcedWhere = this.calculateWhere(where, isChild);

    return {
      calcedWhere,
      calcedOrderBy,
    };
  }

  calculateOrderBy(orderBy: string, where: Prisma.PostWhereInput) {
    const calcedOrderBy = [];
    if (!orderBy) return calcedOrderBy;

    switch (orderBy) {
      case "new":
        calcedOrderBy.push({ createdAt: "desc" });
        break;
      case "old":
        calcedOrderBy.push({ createdAt: "asc" });
        break;
      default:
        if (orderBy.startsWith("top")) {
          calcedOrderBy.push({
            reactions: {
              _count: "desc",
            },
          });
          if (orderBy !== "top-all") {
            this.adjustWhereForTopOrder(orderBy, where);
          }
        }
        break;
    }

    calcedOrderBy.push({ postId: "asc" });
    return calcedOrderBy;
  }

  adjustWhereForTopOrder(orderBy: string, where: Prisma.PostWhereInput) {
    const startDate = new Date();
    const now = new Date();
    const daysAgoLookup = {
      "top-day": 1,
      "top-week": 7,
      "top-month": 30,
      "top-year": 365,
    };

    const daysAgo = daysAgoLookup[orderBy] || 0;
    startDate.setDate(startDate.getDate() - daysAgo);
    where.createdAt = {
      gte: startDate,
      lte: now,
    };
  }

  calculateWhere(where: Prisma.PostWhereInput, isChild: boolean | undefined) {
    if (isChild === undefined) return where;

    where.parentPostId = isChild ? { not: null } : null;
    return where;
  }

  async paginateResults(queryArgs: any, page: number, perPage: number) {
    const paginate = createPaginator({ perPage });
    return paginate<Post, Prisma.PostFindManyArgs>(
      this.prisma.post,
      queryArgs,
      { page }
    );
  }

  async authorizeParentPosts(posts: any[], user: User | undefined) {
    const parentPostAuthorIds = posts
      .map((post) => post.parentPost?.author.userId)
      .filter(Boolean);
    const friendships = user
      ? await this.friendshipsService.findMultipleByPairs(
          user.userId,
          parentPostAuthorIds
        )
      : [];

    for (const post of posts) {
      if (post.parentPost) {
        const parentPost = post.parentPost;
        const isPublicPost = parentPost.isPublic;
        const friendshipFound = friendships.find(
          (f) =>
            f.senderId === parentPost.author.userId ||
            f.recipientId === parentPost.author.userId
        );
        const isAcceptedFriendship =
          friendshipFound?.status === FriendshipStatus.ACCEPTED;
        const isAuthorCurrentUser = parentPost.author.userId === user?.userId;

        if (!(isPublicPost || isAcceptedFriendship || isAuthorCurrentUser)) {
          post.parentPost = "Unauthorized";
        }
      }
    }
  }
}
