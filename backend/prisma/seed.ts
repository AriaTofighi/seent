import { ImageType, PrismaClient, Role } from "@prisma/client";
import * as argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  const hash = await argon2.hash("123");
  const user = await prisma.user.upsert({
    where: { email: "aria.tofighi1@gmail.com" },
    update: {},
    create: {
      email: "aria.tofighi1@gmail.com",
      name: "Aria",
      password: hash,
      birthday: new Date(),
      username: "ariato",
      posts: {
        create: {
          body: "My first post!",
          isPublic: true,
        },
      },
      role: Role.ADMIN,
    },
  });
  await prisma.image.create({
    data: {
      type: ImageType.USER_AVATAR,
      url: "https://seent.s3.us-west-1.amazonaws.com/e420f901-ea7e-4499-992e-44ad052feb55-tubbie.png",
      userId: user.userId,
    },
  });
  await prisma.post.create({
    data: {
      body: "I think Mr. Girl is a little bit wild.",
      isPublic: true,
      authorId: user.userId,
    },
  });
  const destinyPost = await prisma.post.create({
    data: {
      body: "Destiny debates like a freak of nature.",
      isPublic: true,
      authorId: user.userId,
    },
  });
  await prisma.image.create({
    data: {
      type: ImageType.USER_AVATAR,
      url: "https://seent.s3.us-west-1.amazonaws.com/185d7b30-335f-48e8-8386-e3b5278ada54-WideIvanSerious.jpg",
      postId: destinyPost.postId,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
