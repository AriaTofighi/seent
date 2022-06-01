import { Post as PrismaPost } from "@prisma/client";
export class Post implements PrismaPost {
  postId: string;
  authorId: string;
  body: string;
  public: boolean;
  parentPostId: string;
  createdAt: Date;
  updatedAt: Date;
}
