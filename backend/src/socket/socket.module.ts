import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { AppGateway } from "./gateway";
import { GatewaySessionManager } from "./socket.session";

@Module({
  imports: [AuthModule],
  providers: [GatewaySessionManager, AppGateway],
  exports: [GatewaySessionManager, AppGateway],
})
export class SocketModule {}
