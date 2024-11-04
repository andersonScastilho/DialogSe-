import { ConversationEntity, IConversationEntity } from "../entities/conversation.entity"

export interface IConversationRepository {
    create(conversation: ConversationEntity): Promise<void>
    findByParticipants(participant1Id: string, participant2Id: string): Promise<IConversationEntity | null>
    conversation: IConversationEntity[]
}