import { Post } from "@prisma/client";

export class TagEntity implements Post {
  postId: string;
  authorId: string;
  body: string;
  isPublic: boolean;
  parentPostId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<TagEntity>) {
    Object.assign(this, partial);
  }
}
