import {
  OnGatewayConnection,
  OnGatewayDisconnect,
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
      // Corrigido o evento aqui
      message: `User Left the chat:${client.id}`,
    });
  }

  sendMessage(message: IMessageEntity) {
    this.server.emit(`${message.conversationId}`, message.content);
  }
}
