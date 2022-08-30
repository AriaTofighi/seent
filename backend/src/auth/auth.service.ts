import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";
import { ImagesService } from "src/images/images.service";
import { UserEntity } from "src/types";
import { UsersService } from "src/users/users.service";
import { exclude } from "utils/modelHelpers";
import { SignUpDto } from "./dto/signup.dto";
import { JwtPayload } from "./strategies/local.strategy";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = new UserEntity(await this.usersService.findOne({ email }));

    if (user) {
      const validPassword = await argon2.verify(user.password, password);
      if (validPassword) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: userPass, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: JwtPayload) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }

  async signUp(user: SignUpDto) {
    const { email, password, name, birthday, username } = user;

    const userByEmail = await this.usersService.findOne({ email });
    const userByUsername = await this.usersService.findOne({ email });

    if (userByEmail) {
      throw new UnauthorizedException(
        "An account with this email already exists"
      );
    } else if (userByUsername) {
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
}
