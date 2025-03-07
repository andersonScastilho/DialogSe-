import { IConversationExistBetweenUsernames } from '../conversation-exists-between-usernames.repository';
import { prismaClient } from '@/shared/database/prisma-client';

export class PostgresConversationExistsBetweenUsernames
  implements IConversationExistBetweenUsernames
{
  async execute(usernameA: string, usernameB: string): Promise<boolean> {
    const conversation = await prismaClient.conversation.findFirst({
      where: {
        OR: [
          { usernameA, usernameB },
          { usernameA: usernameB, usernameB: usernameA },
        ],
      },
    });

    return !!conversation;
  }
}
