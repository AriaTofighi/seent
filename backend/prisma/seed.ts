import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const demoUser = await prisma.user.upsert({
    where: { email: "aria.tofighi1@gmail.com" },
    update: {},
    create: {
      email: "aria.tofighi1@gmail.com",
      name: "Ariato",
      password: "123",
      birthday: new Date(),
      posts: {
        create: {
          body: "My first post!",
          isPublic: true,
        },
      },
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
