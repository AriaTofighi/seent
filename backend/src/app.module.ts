import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { PostsModule } from "./posts/posts.module";
import { AuthModule } from "./auth/auth.module";
import { ReactionsModule } from "./reactions/reactions.module";
import { ImagesModule } from "./images/images.module";
import { RoomsModule } from "./rooms/rooms.module";
import { MessagesModule } from "./messages/messages.module";
import { SocketModule } from "./socket/socket.module";
import { FriendshipsModule } from "./friendships/friendships.module";

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    ReactionsModule,
    ImagesModule,
    RoomsModule,
    MessagesModule,
    SocketModule,
    FriendshipsModule,
  ],
})
export class AppModule {}
