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
import { forwardRef } from "@nestjs/common/utils";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    ImagesModule,
    forwardRef(() => UsersModule),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
