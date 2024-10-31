export interface IConversationEntity {
  participant1Id: string;
  participant2Id: string;
  messagesId: string[];
}

export class ConversationEntity {
  constructor(private readonly conversation: IConversationEntity) { }

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
