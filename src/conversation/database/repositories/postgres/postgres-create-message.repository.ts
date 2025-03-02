import { IMessageEntity } from '@/conversation/entities/message.entity';
import { ICreateMessageRepository } from '../create-message.repository';
import { prismaClient } from '@/shared/database/prisma-client';

export class PostgresCreateMessageRepository
  implements ICreateMessageRepository
{
  async execute(message: IMessageEntity): Promise<void> {
    await prismaClient.message.create({
      data: {
        content: message.content,
        id: message.id,
        receiver: message.receiver,
        sender: message.sender,
        sentAt: message.sentAt,
        conversationId: message.conversationId,
      },
    });
    return;
  }
}
