import { INestApplicationContext } from "@nestjs/common/interfaces";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { AuthService } from "src/auth/auth.service";
import { AuthenticatedSocket } from "utils/types";

export class WebsocketAdapter extends IoAdapter {
  private authService: AuthService;

  constructor(private app: INestApplicationContext) {
    super(app);
    app.resolve<AuthService>(AuthService).then((authService) => {
      this.authService = authService;
    });
  }

  createIOServer(port: number, options?: any) {
    const server = super.createIOServer(port, options);
    server.use(async (socket: AuthenticatedSocket, next) => {
      const { authorization } = socket.handshake.headers;
      if (!authorization) {
        return next(
          new Error("Not Authenticated. No authorization header was sent")
        );
      }
      const token = authorization.replace("Bearer ", "");
      const user = await this.authService.validateToken(token);
      if (!user) {
        console.log("Error verifying token");
        return next(new Error("Error verifying token"));
      } else {
        socket["user"] = user;
      }

      next();
    });
    return server;
  }
}
