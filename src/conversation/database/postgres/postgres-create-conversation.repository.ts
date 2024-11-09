import { ConversationEntity } from "@/conversation/entities/conversation.entity";
import { ICreateConversationRepository } from "../repositories/create-conversation.repository";
import { prismaClient } from "@/shared/database/prisma-client";

export class PostgresCreateConversationRepository implements ICreateConversationRepository {
    async execute(conversation: ConversationEntity): Promise<void> {
        await prismaClient.conversation.create({
            data: {
                id: conversation.id,
                participant1Id: conversation.participant1Id,
                participant2Id: conversation.participant2Id,
            }
        })

        return
    }
}