import { PrismaService } from "./../prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma, Post } from "@prisma/client";

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput
  ): Promise<any | null> {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput,
      include: {
        author: {
          select: {
            name: true,
          },
        },
        parentPost: {
          select: {
            author: {
              select: {
                name: true,
              },
            },
            postId: true,
          },
        },
        childPosts: {
          select: {
            body: true,
            createdAt: true,
            postId: true,
            author: {
              select: {
                name: true,
              },
            },
            authorId: true,
          },
        },
      },
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        author: {
          select: {
            name: true,
          },
        },
        childPosts: {
          select: {
            body: true,
            createdAt: true,
            postId: true,
            author: {
              select: {
                name: true,
              },
            },
            authorId: true,
          },
        },
        parentPost: {
          select: {
            author: {
              select: {
                name: true,
              },
            },
            postId: true,
          },
        },
        reactions: {
          select: {
            type: true,
            userId: true,
            postId: true,
          },
        },
      },
    });
  }

  async create(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data,
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
}
