import { IConversationEntity } from '@/conversation/entities/conversation.entity';

export interface IShowConversationPerIdRepository {
  execute(conversationId: string): Promise<IConversationEntity>;
}
