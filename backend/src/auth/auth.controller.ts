import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { SignUpDto } from "./dto/signup.dto";

@Controller("api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("local/signup")
  async signUpLocal(@Body() signUpDto: SignUpDto) {
    const user = await this.authService.signUp(signUpDto);
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post("local/signin")
  async signInLocal(@Request() req) {
    const token = await this.authService.login(req.user);
    return token;
  }

  @Post("google/login")
  async signInGoogle(@Body("token") token) {
    const seentToken = await this.authService.googleLogin(token);
    return seentToken;
  }
}
