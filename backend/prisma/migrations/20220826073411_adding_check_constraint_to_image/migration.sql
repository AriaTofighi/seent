-- Only userId or postId can 
ALTER TABLE "Image" ADD CONSTRAINT one_not_null CHECK (
    ("userId" IS NOT NULL OR "postId" IS NOT NULL) 
    AND ("userId" IS NULL OR "postId" IS NULL))