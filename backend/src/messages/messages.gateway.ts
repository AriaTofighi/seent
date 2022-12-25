import { Length } from "class-validator";
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsResponse,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  namespace: "/messages",
})
export class MessagesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private server: Server;

  @SubscribeMessage("sendMessage")
  handleSendMessage(
    client: Socket,
    data: { roomId: string; message: string }
  ): WsResponse<string> {
    const event = "newMessage";
    console.log("NEW MESSAGE RECEIVED", data);
    // this.server.to(data.roomId).emit(event, data.message);
    this.server.emit(event, data.message);
    return { event, data: data.message };
  }

  @SubscribeMessage("deleteMessage")
  handleDeleteMessage(
    client: Socket,
    data: { roomId: string; messageId: string }
  ): WsResponse<string> {
    const event = "messageDeleted";
    this.server.to(data.roomId).emit(event, data.messageId);
    return { event, data: data.messageId };
  }

  @SubscribeMessage("userTyping")
  handleUserTyping(
    client: Socket,
    data: { roomId: string; userId: string }
  ): WsResponse<string> {
    const event = "userTyping";
    this.server.to(data.roomId).emit(event, data.userId);
    return { event, data: data.userId };
  }

  afterInit(server: Server) {
    this.server = server;
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log("NEW CONNECTION", client.handshake.query);
    const { roomId } = client.handshake.query;
    client.join(roomId);
  }

  handleDisconnect(client: Socket) {
    // handle disconnection
    const {} = client.handshake.query;
    // client.leave(roomId);
  }
}
