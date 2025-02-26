import { UsePipes, ValidationPipe } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { IsNotEmpty, IsString } from 'class-validator';
import { Server, Socket } from 'socket.io';

class ChatMessage {
  @IsString()
  @IsNotEmpty()
  sender: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  receiver: string;
}

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log('New User Connected...', client.id);

    this.server.emit('user-joined', {
      message: `User joined the chat:${client.id}`,
    });
  }
  handleDisconnect(client: Socket) {
    console.log('New User Disconected...', client.id);

    this.server.emit('user-joined', {
      message: `User Left the chat:${client.id}`,
    });
  }

  @SubscribeMessage('conversation')
  handleMessage(client: Socket, @MessageBody() message: ChatMessage) {
    console.log(message);
  }
}
