import { Logger } from "@nestjs/common";
import { WebSocketServer, SubscribeMessage } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

export class NotificationsGateway {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger("NotificationsGateway");

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage("notifications")
  async handleNotifications(client: Socket, payload: any) {
    this.logger.log(`Client ${client.id} subscribed to notifications`);
  }
}
