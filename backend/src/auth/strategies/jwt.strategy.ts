import { JwtPayload } from "./../../../utils/types";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { jwtConstants } from "../constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // JWT is validated by passport when this method is reached, return user object
  async validate(payload: JwtPayload): Promise<JwtPayload> {
    const { userId, email, username, name } = payload;
    return {
      userId,
      email,
      username,
      name,
    };
  }
}
