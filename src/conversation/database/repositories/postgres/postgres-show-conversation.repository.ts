import { IConversationEntity } from '@/conversation/entities/conversation.entity';
import { IShowConversationRepository } from '../show-conversation.repository';
import { prismaClient } from '@/shared/database/prisma-client';

export class PostgresShowConversationRepository
  implements IShowConversationRepository
{
  async execute(
    usernameA: string,
    usernameB: string,
  ): Promise<IConversationEntity> {
    const conversation = await prismaClient.conversation.findFirst({
      where: {
        OR: [
          {
            AND: {
              usernameA: usernameB,
              usernameB: usernameA,
            },
          },
          {
            AND: {
              usernameB: usernameB,
              usernameA: usernameA,
            },
          },
        ],
      },
    });
    return conversation;
  }
}
