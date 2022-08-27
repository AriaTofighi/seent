import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { UsersModule } from "./../users/users.module";
import { ImagesModule } from "src/images/images.module";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "src/auth/strategies/local.strategy";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    ImagesModule,
    UsersModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
