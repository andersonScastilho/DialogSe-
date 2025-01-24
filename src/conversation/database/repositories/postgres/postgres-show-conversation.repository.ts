import { IConversationEntity } from '@/conversation/entities/conversation.entity';
import { IShowConversationRepository } from '../show-conversation.repository';
import { prismaClient } from '@/shared/database/prisma-client';

export class PostgresShowConversationRepository
  implements IShowConversationRepository
{
  async execute(
    participant1Id: string,
    participant2Id: string,
  ): Promise<IConversationEntity> {
    const conversation = await prismaClient.conversation.findFirst({
      where: {
        OR: [
          {
            AND: {
              participant1Id: participant2Id,
              participant2Id: participant1Id,
            },
          },
          {
            AND: {
              participant2Id: participant2Id,
              participant1Id: participant1Id,
            },
          },
        ],
      },
    });
    return conversation;
  }
}
