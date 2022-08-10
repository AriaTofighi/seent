/*
  Warnings:

  - Added the required column `updatedAt` to the `Reaction` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Reaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('LIKE', 'DISLIKE');

-- CreateEnum
CREATE TYPE "ImageType" AS ENUM ('USER_AVATAR', 'POST_IMG');

-- AlterTable
ALTER TABLE "Reaction" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "ReactionType" NOT NULL;

-- CreateTable
CREATE TABLE "Image" (
    "imageId" TEXT NOT NULL,
    "type" "ImageType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("imageId")
);
