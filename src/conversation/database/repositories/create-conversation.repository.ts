import { ConversationEntity } from "@/conversation/entities/conversation.entity";

export interface ICreateConversationRepository {
    execute(conversation: ConversationEntity): Promise<void>
}