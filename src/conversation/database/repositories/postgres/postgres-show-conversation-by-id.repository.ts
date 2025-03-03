import { IConversationEntity } from '@/conversation/entities/conversation.entity';
import { IShowConversationPerIdRepository } from '../show-conversation-by-id.repository';
import { prismaClient } from '@/shared/database/prisma-client';

export class PostgresShowConversationPerIdRepository
  implements IShowConversationPerIdRepository
{
  async execute(conversationId: string): Promise<IConversationEntity> {
    const conversation = await prismaClient.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: { messages: true },
    });

    return conversation;
  }
}
