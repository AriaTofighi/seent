import { Reaction, ReactionType } from "@prisma/client";

export class ReactionEntity implements Reaction {
  reactionId: string;
  postId: string;
  userId: string;
  type: ReactionType;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<ReactionEntity>) {
    Object.assign(this, partial);
  }
}
