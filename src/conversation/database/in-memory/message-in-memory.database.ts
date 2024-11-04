import { IMessageEntity, MessageEntity } from "@/conversation/entities/message.entity";

export class MessageInMemoryDatabase {
    public messages: IMessageEntity[] = []

    async create(message: MessageEntity): Promise<void> {
        await this.messages.push(message)
        return
    }
}