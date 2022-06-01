import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [UsersModule, PostsModule],
})
export class AppModule {}
