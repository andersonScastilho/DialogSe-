import {
  ConversationEntity,
  IConversationEntity,
} from '@/conversation/entities/conversation.entity';
import { IConversationRepository } from '../conversation.repository';

export class ConversationInMemoryDatabase implements IConversationRepository {
  conversation: IConversationEntity[] = [];

  async create(conversation: ConversationEntity): Promise<void> {
    await this.conversation.push(conversation);
    return;
  }

  async findByParticipants(
    participant1Id: string,
    participant2Id: string,
  ): Promise<any | null> {
    const [conversation] = this.conversation.filter((conversation) => {
      return (
        conversation.participant1Id === participant1Id &&
        conversation.participant2Id === participant2Id
      );
    });

    return conversation;
  }
}
