import { CreateConversationDto } from '../dto/create-conversation.dto';
import { ICreateConversationRepository } from '../database/repositories/create-conversation.repository';
import { ConversationEntity } from '../entities/conversation.entity';
import { v4 as uuidV4 } from 'uuid';
import { Inject } from '@nestjs/common';
import { IShowUserPerUsernameRepository } from '@/user/database/repositories/show-user-per-username.repository';

export class CreateConversationUseCase {
  constructor(
    @Inject('CreateConversationRepository')
    private readonly createConversationRepository: ICreateConversationRepository,
    @Inject('ShowUserPerUsernameRepository')
    private readonly showUserPerUsernameRepository: IShowUserPerUsernameRepository,
  ) { }
  async execute(conversation: CreateConversationDto) {

    const validatedUsers = await Promise.all(
      conversation.participants.map((participant) => {
        return this.showUserPerUsernameRepository.execute(participant.username)
      })
    )

    const users = validatedUsers.map((user) => {
      return { userId: user.id }
    })

    const conversationEntity = new ConversationEntity({
      id: uuidV4(),
      isGroup: conversation.isGroup,
      participants: users
    });

    await this.createConversationRepository.execute(conversationEntity);

    return;
  }
}
