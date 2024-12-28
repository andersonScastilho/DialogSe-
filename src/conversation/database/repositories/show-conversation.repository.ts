import { IConversationEntity } from "@/conversation/entities/conversation.entity";

export interface IShowConversationRepository {
    execute(participant1Id: string, participant2Id: string): Promise<IConversationEntity>
}