import { Inject } from '@nestjs/common';
import { IShowConversationPerIdRepository } from '../database/repositories/show-conversation-by-id.repository';

export class ShowConversationPerIdUseCase {
  constructor(
    @Inject('ShowConversationPerIdRepository')
    private readonly showConversationByIdepository: IShowConversationPerIdRepository,
  ) {}
  async execute(conversationId: string) {
    const conversation =
      await this.showConversationByIdepository.execute(conversationId);

    return conversation;
  }
}
