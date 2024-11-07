import { IConversationRepository } from '../database/conversation.repository';
import { SendMessageDto } from '../dto/send-message.dto';
import { MessageEntity } from '../entities/message.entity';
import { v4 as uuidV4 } from 'uuid';
import { ConversationEntity } from '../entities/conversation.entity';
import { Inject } from '@nestjs/common';
import { IEncryptDecryptProvider } from '@/shared/providers/encrypt-decrypt.interface';
import { ICreateMessageRepository } from '../database/repositories/create-message.repository';

export class MessageUseCase {
  constructor(
    @Inject('ConversationRepository')
    private readonly conversationRepository: IConversationRepository,
    @Inject(`CreateMessageRepository`)
    private readonly createMessageRepository: ICreateMessageRepository,
    @Inject('EncryptDecryptProvider')
    private readonly encryptDecrypt: IEncryptDecryptProvider,
  ) { }

  async send(message: SendMessageDto) {
    const conversation = await this.conversationRepository.findByParticipants(
      message.sender,
      message.receiver,
    );

    if (!conversation) {
      const conversationEntity = new ConversationEntity({
        participant1Id: message.sender,
        participant2Id: message.receiver,
        messagesId: [],
      });

      await this.conversationRepository.create(conversationEntity);
    }

    const messageToSend = new MessageEntity({
      content: message.content,
      receiver: message.receiver,
      sender: message.sender,
      id: uuidV4(),
    });

    const { encrypted, iv } = this.encryptDecrypt.encrypt(
      messageToSend.content,
    );

    messageToSend.content = encrypted;
    await this.createMessageRepository.execute(messageToSend.toJson());
  }
}
