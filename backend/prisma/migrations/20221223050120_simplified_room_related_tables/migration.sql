/*
  Warnings:

  - You are about to drop the column `content` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Message` table. All the data in the column will be lost.
  - Added the required column `body` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isOwner` to the `RoomUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_userId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "content",
DROP COLUMN "roomId",
DROP COLUMN "userId",
ADD COLUMN     "body" VARCHAR(360) NOT NULL,
ADD COLUMN     "roomUserId" TEXT;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RoomUser" ADD COLUMN     "isOwner" BOOLEAN NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_roomUserId_fkey" FOREIGN KEY ("roomUserId") REFERENCES "RoomUser"("roomUserId") ON DELETE SET NULL ON UPDATE CASCADE;
