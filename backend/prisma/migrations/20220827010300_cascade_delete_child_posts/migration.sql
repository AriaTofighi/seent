-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_parentPostId_fkey";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_parentPostId_fkey" FOREIGN KEY ("parentPostId") REFERENCES "Post"("postId") ON DELETE CASCADE ON UPDATE CASCADE;
