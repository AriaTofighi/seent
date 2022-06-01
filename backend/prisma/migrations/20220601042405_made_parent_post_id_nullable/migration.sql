-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_parentPostId_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "parentPostId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_parentPostId_fkey" FOREIGN KEY ("parentPostId") REFERENCES "Post"("postId") ON DELETE SET NULL ON UPDATE CASCADE;
