/*
  Warnings:

  - Made the column `roomUserId` on table `Message` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_roomUserId_fkey";

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "roomUserId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_roomUserId_fkey" FOREIGN KEY ("roomUserId") REFERENCES "RoomUser"("roomUserId") ON DELETE CASCADE ON UPDATE CASCADE;
