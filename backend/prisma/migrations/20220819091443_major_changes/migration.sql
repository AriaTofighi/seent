/*
  Warnings:

  - The values [POST_IMG] on the enum `ImageType` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `Reaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `avatarId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `PostImage` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[url]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[postId,userId]` on the table `Reaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `entityId` to the `Image` table without a default value. This is not possible if the table is not empty.
  - The required column `reactionId` was added to the `Reaction` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterEnum
BEGIN;
CREATE TYPE "ImageType_new" AS ENUM ('USER_AVATAR', 'POST');
ALTER TABLE "Image" ALTER COLUMN "type" TYPE "ImageType_new" USING ("type"::text::"ImageType_new");
ALTER TYPE "ImageType" RENAME TO "ImageType_old";
ALTER TYPE "ImageType_new" RENAME TO "ImageType";
DROP TYPE "ImageType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_avatarId_fkey";

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "entityId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_pkey",
ADD COLUMN     "reactionId" TEXT NOT NULL,
ADD CONSTRAINT "Reaction_pkey" PRIMARY KEY ("reactionId");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatarId",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT E'USER';

-- DropTable
DROP TABLE "PostImage";

-- CreateIndex
CREATE UNIQUE INDEX "Image_url_key" ON "Image"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_postId_userId_key" ON "Reaction"("postId", "userId");

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
