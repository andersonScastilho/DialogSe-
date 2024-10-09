export interface IConversation {
  participant1Id: string;
  participant2Id: string;
  messagesId: string[];
}

export class ConversationEntity {
  constructor(private readonly conversation: IConversation) {}

  get participant1Id() {
    return this.conversation.participant1Id;
  }

  get participant2Id() {
    return this.conversation.participant2Id;
  }

  get messagesId() {
    return this.conversation.messagesId;
  }

  toJson() {
    return {
      ...this.conversation,
    };
  }
}
