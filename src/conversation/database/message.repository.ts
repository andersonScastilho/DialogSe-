import { IMessage } from "../entities/message.entity";

export interface IMessageRepository {
    create(message: IMessage): Promise<void>
}