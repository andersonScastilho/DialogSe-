import { IMessageEntity } from "@/conversation/entities/message.entity";
import { ICreateMessageRepository } from "../repositories/create-message.repository";

export class PostgresCreateMessageRepository implements ICreateMessageRepository {
    async execute(input: IMessageEntity): Promise<void> {
        return
    }
}