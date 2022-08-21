import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { PostsModule } from "./posts/posts.module";
import { AuthModule } from "./auth/auth.module";
import { ReactionsModule } from "./reactions/reactions.module";
import { ImagesModule } from "./images/images.module";

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    ReactionsModule,
    ImagesModule,
  ],
})
export class AppModule {}
