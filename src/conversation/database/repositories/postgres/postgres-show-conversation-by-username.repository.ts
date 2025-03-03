import { IConversationEntity } from '@/conversation/entities/conversation.entity';
import { prismaClient } from '@/shared/database/prisma-client';
import { IShowConversationPerUsernamesRepository } from '../show-conversation-per-username.repository';

export class PostgresShowConversationPerUsernamesRepository
  implements IShowConversationPerUsernamesRepository {
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
