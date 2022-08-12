-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarId" TEXT;

-- CreateTable
CREATE TABLE "PostImage" (
    "postId" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,

    CONSTRAINT "PostImage_pkey" PRIMARY KEY ("postId","imageId")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Image"("imageId") ON DELETE SET NULL ON UPDATE CASCADE;
