import { IConversationEntity } from "@/conversation/entities/conversation.entity";
import { IIndexConversationsPerUserRepository } from "../index-conversations-per-user.repository";
import { prismaClient } from "@/shared/database/prisma-client";

export class PostgresIndexConversationsPerUserRepository implements IIndexConversationsPerUserRepository {
    async execute(username: string): Promise<IConversationEntity[]> {

        const conversation = await prismaClient.conversation.findMany({
            where: {
                OR: [
                    {
                        usernameA: username
                    }, {
                        usernameB: username
                    }
                ],
            }, include: {
                messages: true
            }
        })

        return conversation
    }
}