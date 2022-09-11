import { ImageType, PrismaClient, Role } from "@prisma/client";
import * as argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  const DEFAULT_PASSWORD = "123";
  const hash = await argon2.hash(DEFAULT_PASSWORD);

  await prisma.user.upsert({
    where: { email: "aria.tofighi1@gmail.com" },
    update: {},
    create: {
      email: "aria.tofighi1@gmail.com",
      name: "Aria",
      password: hash,
      birthday: new Date("1999-01-01"),
      username: "ariato",
      bio: "i'm a miracle lyrical individual",
      gender: "m",
      location: "canada",
      posts: {
        create: {
          body: "Hello world, this is my first post. Ariato out.",
          isPublic: true,
          createdAt: new Date(new Date().getDate() - 2),
        },
      },
      images: {
        create: {
          type: ImageType.USER_AVATAR,
          url: "https://seent.s3.us-west-1.amazonaws.com/0210fa87-ff26-43eb-884c-671e2b3e50b4.jpg",
        },
      },
      role: Role.ADMIN,
    },
  });
  await prisma.user.upsert({
    where: { email: "aria.tofighi2@gmail.com" },
    update: {},
    create: {
      email: "aria.tofighi2@gmail.com",
      name: "Moe B",
      password: hash,
      birthday: new Date("1999-10-10"),
      username: "moeb",
      bio: "moe b the g",
      gender: "m",
      location: "usa",
      posts: {
        create: {
          body: "It's big Moe, what it do?",
          isPublic: true,
          createdAt: new Date(new Date().getDate() - 1),
        },
      },
      images: {
        create: {
          type: ImageType.USER_AVATAR,
          url: "https://seent.s3.us-west-1.amazonaws.com/0aa5302c-ee0f-45a4-b83e-a7fbb557818b.png",
        },
      },
      role: Role.USER,
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
