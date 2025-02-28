import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IMessageEntity } from '@/conversation/entities/message.entity';

@WebSocketGateway({
  namespace: 'conversation',
})
export class ConversationEventsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log('New User Connected...', client.id);

    this.server.emit('user-joined', {
      message: `User joined the chat:${client.id}`,
    });
  }

  handleDisconnect(client: Socket) {
    console.log('New User Disconnected...', client.id);

    this.server.emit('user-left', {
      message: `User Left the chat:${client.id}`,
    });
  }

  @SubscribeMessage('message')
  sendMessage(message: IMessageEntity) {
    this.server.emit(`${message.receiver}`, message.content);
  }
}
