import { Prisma, Post, ImageType } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { PostFindManyParams } from "./posts.types";
import { createPaginator } from "prisma-pagination";
import { ImagesService } from "src/images/images.service";
import { forwardRef, Inject, Injectable } from "@nestjs/common";

@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => ImagesService))
    private imagesService: ImagesService
  ) {}

  async findOne(postWhereUniqueInput: Prisma.PostWhereUniqueInput) {
    const post = await this.prisma.post.findUnique({
      where: postWhereUniqueInput,
      include: {
        author: {
          select: {
            name: true,
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
        reactions: {
          select: {
            type: true,
            userId: true,
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
      },
    });

    return post;
  }

  async findMany(params: PostFindManyParams) {
    const { where, orderBy, page, perPage } = params;
    const paginate = createPaginator({ perPage: perPage });
    const result = await paginate<Post, Prisma.PostFindManyArgs>(
      this.prisma.post,
      {
        where,
        orderBy,
        include: {
          author: {
            select: {
              name: true,
              username: true,
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
        },
      },
      { page: page }
    );

    result.data.sort((a, b) => Number(b.createdAt) - Number(a.createdAt));

    return result;
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
