import { IMessageEntity, MessageEntity } from "../entities/message.entity";

export interface IMessageRepository {
    create(message: IMessageEntity): Promise<void>
    messages: MessageEntity[]
}