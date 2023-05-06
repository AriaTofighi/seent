import { Logger } from "@nestjs/common";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { AuthenticatedSocket } from "utils/types";
import { GatewaySessionManager } from "./socket.session";

@WebSocketGateway({
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private sessionManager: GatewaySessionManager) {}

  @WebSocketServer()
  public server: Server;

  private logger: Logger = new Logger("AppGateway");

  handleDisconnect(client: AuthenticatedSocket) {
    this.logger.log(`Client disconnected: ${client.user.userId}`);
    this.sessionManager.removeUserSocket(client.user.userId);
    const userIds = Array.from(this.sessionManager.getSockets().keys());
    for (const [userId, socket] of this.sessionManager.getSockets()) {
      this.server.emit("userDisconnected", userIds);
      console.log("Test");
    }
  }

  handleConnection(client: AuthenticatedSocket) {
    this.logger.log(`Client connected: ${client.user.userId}`);
    this.sessionManager.setUserSocket(client.user.userId, client);
    const userIds = Array.from(this.sessionManager.getSockets().keys());
    for (const [userId, socket] of this.sessionManager.getSockets()) {
      socket.emit("userConnected", userIds);
    }
  }
}
