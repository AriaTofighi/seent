import {
  ImageType,
  PrismaClient,
  Role,
  NotificationType,
  FriendshipStatus,
  ReactionType,
} from "@prisma/client";
import * as argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  const DEFAULT_PASSWORD = "123";
  const hash = await argon2.hash(DEFAULT_PASSWORD);

  const user1 = await prisma.user.upsert({
    where: { email: "aria.tofighi1@gmail.com" },
    update: {},
    create: {
      email: "aria.tofighi1@gmail.com",
      name: "Aria",
      password: hash,
      birthday: new Date("1999-01-01"),
      username: "ariato",
      bio: "I'm a miracle lyrical individual",
      gender: "m",
      location: "Canada",
      role: Role.ADMIN,
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
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "aria.tofighi2@gmail.com" },
    update: {},
    create: {
      email: "aria.tofighi2@gmail.com",
      name: "Moe B",
      password: hash,
      birthday: new Date("1999-10-10"),
      username: "moeb",
      bio: "Moe B the G",
      gender: "m",
      location: "USA",
      role: Role.USER,
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
    },
  });

  const post2 = await prisma.post.create({
    data: {
      body: "I'm happy to join this community!",
      isPublic: true,
      authorId: user2.userId,
    },
  });

  const reaction1 = await prisma.reaction.create({
    data: {
      postId: post2.postId,
      userId: user1.userId,
      type: ReactionType.LIKE,
    },
  });

  const room1 = await prisma.room.create({
    data: {
      title: "General Chat",
    },
  });

  await prisma.roomUser.create({
    data: {
      roomId: room1.roomId,
      userId: user1.userId,
      isOwner: true,
    },
  });

  await prisma.roomUser.create({
    data: {
      roomId: room1.roomId,
      userId: user2.userId,
      isOwner: false,
    },
  });

  const message1 = await prisma.message.create({
    data: {
      body: "Hello everyone!",
      roomUserId: user1.userId,
    },
  });

  const message2 = await prisma.message.create({
    data: {
      body: "Hey! Nice to meet you all!",
      roomUserId: user2.userId,
    },
  });

  const notification1 = await prisma.notification.create({
    data: {
      type: NotificationType.MESSAGE,
      recipientId: user2.userId,
      senderId: user1.userId,
      roomId: room1.roomId,
      read: false,
    },
  });

  const notification2 = await prisma.notification.create({
    data: {
      type: NotificationType.LIKE,
      recipientId: user2.userId,
      senderId: user1.userId,
      postId: post2.postId,
      read: false,
    },
  });

  const friendship = await prisma.friendship.create({
    data: {
      recipientId: user2.userId,
      senderId: user1.userId,
      status: FriendshipStatus.ACCEPTED,
    },
  });

  const tag1 = await prisma.tag.create({
    data: {
      name: "Welcome",
      creatorId: user1.userId,
    },
  });

  const postTag1 = await prisma.postTag.create({
    data: {
      postId: post2.postId,
      tagId: tag1.tagId,
    },
  });

  console.log({
    user1,
    user2,
    post2,
    reaction1,
    room1,
    message1,
    message2,
    notification1,
    notification2,
    friendship,
    tag1,
    postTag1,
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
