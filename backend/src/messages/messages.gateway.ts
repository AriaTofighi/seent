import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { WebSocketServer } from "@nestjs/websockets/decorators";
import { Server } from "socket.io";
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
    // console.log("Joined room ", roomId);
    client.join(`room-${roomId}`);
    // console.log(this.server.sockets.adapter.rooms);
    this.server.to(`room-${roomId}`).emit("userJoined");
  }

  @SubscribeMessage("leaveRoom")
  handleLeaveRoom(client: AuthenticatedSocket, data: { roomId: string }) {
    const { roomId } = data;

    // console.log("Left room ", roomId);
    client.leave(`room-${roomId}`);
    this.server.to(`room-${roomId}`).emit("userLeft");
  }

  @SubscribeMessage("sendMessage")
  handleSendMessage(client: AuthenticatedSocket, data: { roomId: string }) {
    const { roomId } = data;
    // console.log("Message sent by ", client.user.username);
    // console.log("Message sent to room ", roomId);
    // console.log("Active rooms: ", this.server.sockets.adapter.rooms);

    this.server.to(`room-${roomId}`).emit("newMessage");
    // console.log(this.server.sockets.adapter.rooms);
    // console.log("Emmited newMessage to room ", roomId);
  }

  @SubscribeMessage("userTyping")
  handleUserTyping(client: AuthenticatedSocket, data: { roomId: string }) {
    const { roomId } = data;
    this.server.to(`room-${roomId}`).emit("userTyping");
  }
}
