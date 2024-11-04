import { IConversationRepository } from "../database/conversation.repository";
import { SendMessageDto } from "../dto/send-message.dto";
import { IMessageRepository } from "../database/message.repository";
import { MessageEntity } from "../entities/message.entity";
import { v4 as uuidV4 } from 'uuid';
import { ConversationEntity } from "../entities/conversation.entity";
import { Inject } from "@nestjs/common";

export class MessageUseCase {
    constructor(
        @Inject('ConversationRepository') private readonly conversationRepository: IConversationRepository,
        @Inject(`MessageRepository`) private readonly messageRepository: IMessageRepository) { }

    async send(message: SendMessageDto) {
        const conversation = await this.conversationRepository.findByParticipants(message.sender, message.receiver)

        if (!conversation) {
            const conversationEntity = new ConversationEntity({
                participant1Id: message.sender,
                participant2Id: message.receiver,
                messagesId: []
            })

            await this.conversationRepository.create(conversationEntity)

            return
        }

        const messageToSend = new MessageEntity({
            content: message.content,
            receiver: message.receiver,
            sender: message.sender,
            id: uuidV4(),
        })

        await this.messageRepository.create(messageToSend.toJson())

        console.log(this.messageRepository.messages)
        console.log(this.conversationRepository.conversation)
    }
}
