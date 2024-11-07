import { IMessageEntity } from "@/conversation/entities/message.entity";

export interface ICreateMessageRepository {
    execute(input: IMessageEntity): Promise<void>
}