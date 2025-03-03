import { IConversationEntity } from "@/conversation/entities/conversation.entity";

export interface IIndexConversationsPerUserRepository {
    execute(username: string): Promise<IConversationEntity[]>
}   