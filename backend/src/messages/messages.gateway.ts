import {
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from "@nestjs/websockets";
import { WebSocketServer } from "@nestjs/websockets/decorators";
import { Server, Socket } from "socket.io";
import { GatewaySessionManager } from "src/socket/socket.session";
import { AuthenticatedSocket } from "utils/types";

@WebSocketGateway({
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})
export class MessagesGateway {
  constructor(readonly sessionManager: GatewaySessionManager) {}

  @WebSocketServer()
  private server: Server;

  @SubscribeMessage("joinRoom")
  handleJoinRoom(client: AuthenticatedSocket, data: { roomId: string }) {
    const { roomId } = data;
    // const {
    //   user: { userId },
    // } = client;

    client.join(`room-${roomId}`);
    this.server.to(`room-${roomId}`).emit("userJoined");
  }

  @SubscribeMessage("leaveRoom")
  handleLeaveRoom(client: AuthenticatedSocket, data: { roomId: string }) {
    const { roomId } = data;
    client.leave(`room-${roomId}`);
    this.server.to(`room-${roomId}`).emit("userLeft");
  }

  @SubscribeMessage("sendMessage")
  handleSendMessage(client: AuthenticatedSocket, data: { roomId: string }) {
    const { roomId } = data;
    this.server.to(`room-${roomId}`).emit("newMessage");
  }

  @SubscribeMessage("userTyping")
  handleUserTyping(client: AuthenticatedSocket, data: { roomId: string }) {
    const { roomId } = data;
    this.server.to(`room-${roomId}`).emit("userTyping");
  }
}
