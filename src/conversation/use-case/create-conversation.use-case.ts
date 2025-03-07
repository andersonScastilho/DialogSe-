import { BadRequestError } from '@/shared/errors/bad-request.error';
import { CreateConversationDto } from '../dto/create-conversation.dto';
import { ICreateConversationRepository } from '../database/repositories/create-conversation.repository';
import { ConversationEntity } from '../entities/conversation.entity';
import { v4 as uuidV4 } from 'uuid';
import { IConversationExistBetweenUsernames } from '../database/repositories/conversation-exists-between-usernames.repository';
import { Inject } from '@nestjs/common';

export class CreateConversationUseCase {
  constructor(
    @Inject('ConversationExistsBetweenUsernames')
    private readonly conversationExistsBetweenUsernames: IConversationExistBetweenUsernames,
    @Inject('CreateConversationRepository')
    private readonly createConversationRepository: ICreateConversationRepository,
  ) {}
  async execute(conversation: CreateConversationDto) {
    const conversationExists =
      await this.conversationExistsBetweenUsernames.execute(
        conversation.usernameA,
        conversation.usernameB,
      );

    if (conversationExists) {
      throw new BadRequestError('Conversation exists');
    }

    const conversationEntity = new ConversationEntity({
      usernameA: conversation.usernameA,
      usernameB: conversation.usernameB,
      id: uuidV4(),
    });

    await this.createConversationRepository.execute(conversationEntity);

    return;
  }
}
