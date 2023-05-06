# Seent

A modern and feature-rich social media application built with a backend leveraging Nest.js, Prisma, and PostgreSQL, and a frontend using Next.js. Seent provides a platform for users to create and share posts, interact with each other through likes, replies, and messaging, as well as manage friendships and notifications.

To see the deployed version, visit https://seent.vercel.app.

## Table of Contents

1. [Features](#features)
2. [Technology Stack](#technology-stack)
3. [Database Schema](#database-schema)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)

## Features

- 🔐 User registration, authentication (email/password and Google login), and authorization
- ✍️ Post creation and deletion
- 🌎 Public/private posts
- 💬 Post replies and thread interactions
- ❤️ Post reactions
- 📷 Post media attachments
- 🔖 Custom post tags
- 👥 Friendships with request and acceptance flow
- 🟢 Real-time online status indicators
- 📩 Real-time private and group messaging
- 📢 Real-time notifications for likes, replies, messages, friendship interactions
- 🧑‍🤝‍🧑 User profiles with avatars and bios
- 🔍 Sorting and filtering
- 📄 Pagination

## Technology Stack

- Backend: Nest.js REST API, Prisma, PostgreSQL, Amazon S3
- Frontend: Next.js, React

## Database Schema

The database schema is designed using Prisma and PostgreSQL. It includes the following models:

- User
- Post
- Reaction
- Image
- Room
- RoomUser
- Message
- Notification
- Friendship
- Tag
- PostTag

For a detailed schema with relationships, please refer to the `schema.prisma` file in the backend/prisma folder.

## Getting Started

Follow the steps below to set up the project on your local machine.

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL (v10 or later)
- Yarn or npm (package manager)

### Installation

First, clone the repository:

```git clone https://github.com/AriaTofighi/seent.git```


```cd seent```

#### Backend

1. Navigate to the backend folder:

   ```cd backend```

2. Install the dependencies:

   ```npm install```

3. Create a `.env.local` file and provide values based on the .env.local.example file

4. Apply the Prisma migrations to your database:

   ```npx prisma migrate dev```

5. Start the development server:

   ```npm run dev```

#### Frontend

1. Navigate to the frontend folder (from root):

   ```cd frontend```

2. Install the dependencies:

   ```npm install```

3. Create a `.env.local` file and provide values based on the .env.local.example file

4. Start the development server:

   ```npm run dev```

5. Open your browser at `http://localhost:3000` and start using the application.
