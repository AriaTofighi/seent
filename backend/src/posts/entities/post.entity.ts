import { Post } from "@prisma/client";
import { UserEntity } from "./../../users/entities/user.entity";
import { ImageEntity } from "./../../images/entities/image.entity";
import { ReactionEntity } from "./../../reactions/entities/reaction.entity";

export class PostEntity implements Post {
  postId: string;
  authorId: string;
  body: string;
  isPublic: boolean;
  parentPostId: string;
  createdAt: Date;
  updatedAt: Date;

  reactions: ReactionEntity[];
  author: UserEntity;
  images?: ImageEntity[];
  parentPost?: PostEntity;
  _count: Count;

  constructor(partial: Partial<PostEntity>) {
    Object.assign(this, partial);
  }
}

class Count {
  childPosts: number;
}
