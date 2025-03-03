import { IConversationEntity } from '@/conversation/entities/conversation.entity';

export interface IShowConversationPerUsernamesRepository {
  execute(usernameA: string, usernameB: string): Promise<IConversationEntity>;
}
