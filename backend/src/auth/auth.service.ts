import * as argon2 from "argon2";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { exclude } from "utils/modelUtils";
import { SignUpDto } from "./dto/signup.dto";
import { UserEntity } from "src/users/entities/user.entity";
import { JwtPayload } from "utils/types";
import { OAuth2Client } from "google-auth-library";
import { ImageType } from "@prisma/client";
import { randomUUID } from "crypto";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne({ email });
    if (user) {
      const validPassword = await argon2.verify(user.password, password);
      if (validPassword) {
        return new UserEntity(user);
      }
    }
    return null;
  }

  async validateToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (ex) {
      return null;
    }
  }

  async login(user: JwtPayload) {
    const { email } = user;
    const dbUser = await this.usersService.findOne({
      email,
    });

    if (dbUser.password === "google") {
      throw new UnauthorizedException(
        "You signed up with Google. Please use Google to login"
      );
    }

    return {
      accessToken: this.jwtService.sign(user),
    };
  }

  async signUp(user: SignUpDto) {
    const { email, password, name, birthday, username } = user;

    const userByEmail = await this.usersService.findOne({ email });
    const userByUsername = await this.usersService.findOne({ username });

    if (userByEmail) {
      throw new UnauthorizedException(
        "An account with this email already exists"
      );
    }
    if (userByUsername) {
      throw new UnauthorizedException(
        "An account with this username already exists"
      );
    }

    const hash = await argon2.hash(password);

    const newUser = await this.usersService.create({
      email,
      password: hash,
      name,
      birthday,
      username,
    });

    const userWithoutPassword = exclude(newUser, "password");

    return {
      ...userWithoutPassword,
      accessToken: this.jwtService.sign(userWithoutPassword),
    };
  }

  async googleLogin(token: string) {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw new UnauthorizedException({ message: "Invalid Google token" });
    }

    const { email, name, picture } = payload;

    let user = await this.usersService.findOne({
      email,
    });

    if (!user) {
      user = await this.usersService.create({
        email,
        name,
        birthday: new Date(),
        username: name + randomUUID(),
        password: "google",
        images: {
          create: [
            {
              url: picture,
              type: ImageType.USER_AVATAR,
            },
          ],
        },
      });
    } else if (user.password !== "google") {
      throw new UnauthorizedException({
        message:
          "You signed up with email and password. Please use email and password to login",
      });
    }

    const userToSign: JwtPayload = {
      userId: user.userId,
      email: user.email,
      name: user.name,
      username: user.username,
      role: user.role,
    };

    return {
      ...user,
      accessToken: this.jwtService.sign(userToSign),
    };
  }
}
