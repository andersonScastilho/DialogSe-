import { BadRequestError } from '@/shared/errors/bad-request.error';
import { CreateConversationDto } from '../dto/create-conversation.dto';
import { ICreateConversationRepository } from '../database/repositories/create-conversation.repository';
import { ConversationEntity } from '../entities/conversation.entity';
import { v4 as uuidV4 } from 'uuid';
import { IConversationExistBetweenUsernames } from '../database/repositories/conversation-exists-between-usernames.repository';
import { Inject } from '@nestjs/common';
import { IShowUserPerUsernameRepository } from '@/user/database/repositories/show-user-per-username.repository';

export class CreateConversationUseCase {
  constructor(
    @Inject('ConversationExistsBetweenUsernames')
    private readonly conversationExistsBetweenUsernames: IConversationExistBetweenUsernames,
    @Inject('CreateConversationRepository')
    private readonly createConversationRepository: ICreateConversationRepository,
    @Inject('ShowUserPerUsernameRepository')
    private readonly showUserPerUsernameRepository: IShowUserPerUsernameRepository
  ) { }
  async execute(conversation: CreateConversationDto) {
    const usernameA = await this.showUserPerUsernameRepository.execute(conversation.usernameA)
    const usernameB = await this.showUserPerUsernameRepository.execute(conversation.usernameB)

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
