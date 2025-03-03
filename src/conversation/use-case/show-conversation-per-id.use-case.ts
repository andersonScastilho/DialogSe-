import { Inject } from '@nestjs/common';
import { IShowConversationPerIdRepository } from '../database/repositories/show-conversation-by-id.repository';
import { OutputConversationDto } from '../dto/output-conversation.dto';
import { ConversationEntity } from '../entities/conversation.entity';

export class ShowConversationPerIdUseCase {
  constructor(
    @Inject('ShowConversationPerIdRepository')
    private readonly showConversationByIdepository: IShowConversationPerIdRepository,
  ) {}
  async execute(conversationId: string) {
    const conversation =
      await this.showConversationByIdepository.execute(conversationId);

    const entity = new ConversationEntity(conversation);

    return OutputConversationDto.output(entity);
  }
}
