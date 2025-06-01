import { CreateConversationDto } from '../dto/create-conversation.dto';
import { ICreateConversationRepository } from '../database/repositories/create-conversation.repository';
import { ConversationEntity } from '../entities/conversation.entity';
import { v4 as uuidV4 } from 'uuid';
import { Inject } from '@nestjs/common';

export class CreateConversationUseCase {
  constructor(
    @Inject('CreateConversationRepository')
    private readonly createConversationRepository: ICreateConversationRepository,
  ) {}
  async execute(conversation: CreateConversationDto) {
    const conversationEntity = new ConversationEntity({
      id: uuidV4(),
      isGroup: conversation.isGroup,
      participants: conversation.participants,
    });

    await this.createConversationRepository.execute(conversationEntity);

    return;
  }
}
