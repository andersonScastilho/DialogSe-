import { ParticipantConversationDto } from '../dto/participant-conversation.dto';
import { IMessageEntity } from './message.entity';

export interface IConversationEntity {
  messages?: IMessageEntity[];
  participants: ParticipantConversationDto[];
  isGroup: boolean;
  id: string;
}

export class ConversationEntity {
  constructor(private readonly conversation: IConversationEntity) {}

  get id() {
    return this.conversation.id;
  }

  get isGroup() {
    return this.conversation.isGroup;
  }

  get messages() {
    return this.conversation.messages;
  }

  get participants() {
    return this.conversation.participants;
  }

  toJson() {
    return {
      ...this.conversation,
    };
  }
}
