import { IConversationEntity } from '@/conversation/entities/conversation.entity';

export interface IShowConversationRepository {
  execute(usernameA: string, usernameB: string): Promise<IConversationEntity>;
}
