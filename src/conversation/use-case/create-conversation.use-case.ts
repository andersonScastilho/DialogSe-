import { BadRequestError } from '@/shared/errors/bad-request.error';
import { IShowConversationPerUsernamesRepository } from '../database/repositories/show-conversation-per-username.repository';
import { CreateConversationDto } from '../dto/create-conversation.dto';
import { ICreateConversationRepository } from '../database/repositories/create-conversation.repository';
import { ConversationEntity } from '../entities/conversation.entity';
import { v4 as uuidV4 } from 'uuid';

export class CreateConversationUseCase {
  constructor(
    private readonly showConversationPerUsernamesRepository: IShowConversationPerUsernamesRepository,
    private readonly createConversationRepository: ICreateConversationRepository,
  ) {}
  async execute(conversation: CreateConversationDto) {
    const conversationExists =
      await this.showConversationPerUsernamesRepository.execute(
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
