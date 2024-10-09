import { ConversationEntity, IConversation } from "@/conversation/entities/conversation.entity";
import { IConversationRepository } from "../conversation.repository";

export class ConversationInMemoryDatabase implements IConversationRepository {
    conversation: IConversation[] = []

    create(conversation: ConversationEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }

    findByParticipants(participant1Id: string, participant2Id: string): Promise<any | null> {
        throw new Error("Method not implemented.");
    }

}