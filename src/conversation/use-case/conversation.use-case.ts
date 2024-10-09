import { IConversationRepository } from "../database/conversation.repository";
import { SendMessageDto } from "../dto/send-message.dto";
import { IMessageRepository } from "../database/message.repository";
import { MessageEntity } from "../entities/message.entity";
import { v4 as uuidV4 } from 'uuid';
import { ConversationEntity } from "../entities/conversation.entity";

export class Conversation {
    constructor(private readonly conversationRepository: IConversationRepository, private readonly messageRepositroy: IMessageRepository) { }

    async create(message: SendMessageDto) {
        const isExists = await this.conversationRepository.findByParticipants(message.sender, message.receiver)

        if (!isExists) {

            const conversationEntity = new ConversationEntity({
                participant1Id: message.sender,
                participant2Id: message.receiver,
                messagesId: []
            })

            await this.conversationRepository.create(conversationEntity)
        }

        const messageId = uuidV4()

        const messageEntity = new MessageEntity({
            content: message.content,
            receiver: message.receiver,
            sender: message.sender,
            sentAt: new Date(),
            id: messageId
        })

        await this.messageRepositroy.create(messageEntity)
    }
}