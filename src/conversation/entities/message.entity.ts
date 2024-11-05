export interface IMessageEntity {
  sender: string;
  receiver: string;
  content: string;
  sentAt?: Date;
  id: string;
}

export class MessageEntity {
  constructor(private readonly message: IMessageEntity) {}

  set content(value: string) {
    this.message.content = value;
  }

  get sender() {
    return this.message.sender;
  }

  get receiver() {
    return this.message.receiver;
  }

  get sentAt() {
    return this.message.sentAt;
  }

  get content() {
    return this.message.content;
  }

  get id() {
    return this.message.id;
  }

  toJson() {
    return {
      ...this.message,
    };
  }
}
