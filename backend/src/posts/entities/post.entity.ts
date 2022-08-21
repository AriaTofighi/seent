import { Post } from "@prisma/client";

export class PostEntity implements Post {
  postId: string;
  authorId: string;
  body: string;
  isPublic: boolean;
  parentPostId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<PostEntity>) {
    Object.assign(this, partial);
  }
}
