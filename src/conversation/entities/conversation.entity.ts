import { IMessageEntity } from './message.entity';

export interface IConversationEntity {
  usernameA: string;
  usernameB: string;
  messages?: IMessageEntity[];
  id: string;
}

export class ConversationEntity {
  constructor(private readonly conversation: IConversationEntity) {}

  get usernameA() {
    return this.conversation.usernameA;
  }

  get usernameB() {
    return this.conversation.usernameB;
  }

  get id() {
    return this.conversation.id;
  }

  get messages() {
    return this.conversation.messages;
  }

  toJson() {
    return {
      ...this.conversation,
    };
  }
}
