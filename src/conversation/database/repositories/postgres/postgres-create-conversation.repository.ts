import { ConversationEntity } from '@/conversation/entities/conversation.entity';
import { ICreateConversationRepository } from '../create-conversation.repository';
import { prismaClient } from '@/shared/database/prisma-client';

export class PostgresCreateConversationRepository
  implements ICreateConversationRepository
{
  async execute(conversation: ConversationEntity): Promise<void> {
    await prismaClient.conversation.create({
      data: {
        id: conversation.id,
        usernameA: conversation.usernameA,
        usernameB: conversation.usernameB,
      },
    });

    return;
  }
}
