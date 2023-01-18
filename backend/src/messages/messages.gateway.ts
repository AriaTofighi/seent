import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { WebSocketServer } from "@nestjs/websockets/decorators";
import { RoomUser } from "@prisma/client";
import { Server } from "socket.io";
import { RoomUsersService } from "src/room-users/room-users.service";
import { GatewaySessionManager } from "src/socket/socket.session";
import { AuthenticatedSocket } from "utils/types";

@WebSocketGateway({
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})
export class MessagesGateway {
  constructor(
    readonly sessionManager: GatewaySessionManager,
    readonly roomUsersService: RoomUsersService
  ) {}

  @WebSocketServer()
  private server: Server;

  @SubscribeMessage("joinRoom")
  handleJoinRoom(client: AuthenticatedSocket, data: { roomId: string }) {
    const { roomId } = data;
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

  @SubscribeMessage("newRoom")
  async handleNewRoom(client: AuthenticatedSocket, data: { roomId: string }) {
    const { roomId } = data;
    console.log(data);
    const roomUsers = (await this.roomUsersService.findMany({
      where: { roomId },
    })) as RoomUser[];
    for (const roomUser of roomUsers) {
      const userSocket = this.sessionManager.getUserSocket(roomUser.userId);
      if (userSocket) {
        userSocket.emit("newRoom");
      }
    }
  }

  @SubscribeMessage("userTyping")
  handleUserTyping(client: AuthenticatedSocket, data: { roomId: string }) {
    const { roomId } = data;
    this.server.to(`room-${roomId}`).emit("userTyping");
  }
}
