import { ConversationEntity } from "../entities/conversation.entity"

export interface IConversationRepository {
    create(conversation: ConversationEntity): Promise<void>
    findByParticipants(participant1Id: string, participant2Id: string): Promise<any | null>
}