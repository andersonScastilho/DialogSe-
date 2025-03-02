export interface IConversationEntity {
  usernameA: string;
  usernameB: string;
  messagesId?: string[];
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

  get messagesId() {
    return this.conversation.messagesId;
  }

  toJson() {
    return {
      ...this.conversation,
    };
  }
}
