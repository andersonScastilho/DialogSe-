import { ConversationEntity } from '../entities/conversation.entity';

export class OutputConversationDto {
  static output(entity: ConversationEntity) {
    return entity.toJson();
  }
}
