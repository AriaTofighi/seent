import { Post, Reaction, ReactionType } from "@prisma/client";

export class GetReactionDto implements Reaction {
  createdAt: Date;
  updatedAt: Date;
  postId: string;
  userId: string;
  type: ReactionType;
  post: Post;
}
