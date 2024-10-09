import { IMessage } from './message.entity';

export interface IConversation {
  participant1Id: string;
  participant2Id: string;
  messages: IMessage[];
}

export class ConversationEntity {
  constructor(private readonly conversation: IConversation) {}

  get participant1Id() {
    return this.conversation.participant1Id;
  }

  get participant2Id() {
    return this.conversation.participant2Id;
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
