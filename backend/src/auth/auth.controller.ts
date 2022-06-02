import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { Controller, Post, Request, UseGuards } from "@nestjs/common";

@Controller("api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("local/signup")
  async signUpLocal(@Request() req) {
    // this.authService.signUpLocal()
  }

  @UseGuards(LocalAuthGuard)
  @Post("local/signin")
  async signInLocal(@Request() req) {
    const token = await this.authService.login(req.user);
    return token;
  }
}
