import { JwtPayload } from "./../../../utils/types";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  // JWT is validated by passport when this method is reached, return user object
  async validate(payload: JwtPayload): Promise<JwtPayload> {
    const { userId, email, username, name, role } = payload;
    return {
      userId,
      email,
      username,
      name,
      role,
    };
  }
}
