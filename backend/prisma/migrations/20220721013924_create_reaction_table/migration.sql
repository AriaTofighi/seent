-- CreateTable
CREATE TABLE "Reaction" (
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("postId","userId")
);
