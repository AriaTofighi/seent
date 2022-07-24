import { Reaction } from "@prisma/client";

export class GetReactionDto implements Reaction {
  postId: string;
  userId: string;
  type: string;
}
