import { IMessageEntity } from '@/conversation/entities/message.entity';

export interface IConversationEventsGateway {
  sendMessage(message: IMessageEntity): void;
}
