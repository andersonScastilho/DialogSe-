import { IMessageEntity } from "@/conversation/entities/message.entity";
import { ICreateMessageRepository } from "../create-message.repository";
import { prismaClient } from "@/shared/database/prisma-client";

export class PostgresCreateMessageRepository implements ICreateMessageRepository {
    async execute(input: IMessageEntity): Promise<void> {
        await prismaClient.message.create({
            data: {
                content: input.content,
                id: input.id,
                receiver: input.receiver,
                sender: input.sender,
                sentAt: input.sentAt,
                conversationId: input.conversationId
            }
        })
        return
    }
}