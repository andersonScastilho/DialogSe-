import { SendMessageDto } from '../dto/send-message.dto';
import { MessageEntity } from '../entities/message.entity';
import { v4 as uuidV4 } from 'uuid';
import { ConversationEntity } from '../entities/conversation.entity';
import { Inject } from '@nestjs/common';
import { IEncryptDecryptProvider } from '@/shared/providers/encrypt-decrypt.interface';
import { ICreateMessageRepository } from '../database/repositories/create-message.repository';
import { ICreateConversationRepository } from '../database/repositories/create-conversation.repository';
import { IShowConversationRepository } from '../database/repositories/show-conversation.repository';

export class MessageUseCase {
  constructor(
    @Inject('CreateConversationRepository')
    private readonly createConversationRepository: ICreateConversationRepository,
    @Inject(`CreateMessageRepository`)
    private readonly createMessageRepository: ICreateMessageRepository,
    @Inject('EncryptDecryptProvider')
    private readonly encryptDecrypt: IEncryptDecryptProvider,
    @Inject('ShowConversationRepository')
    private readonly showConversationRepository: IShowConversationRepository
  ) { }

  async send(message: SendMessageDto) {
    const conversation = await this.showConversationRepository.execute(message.receiver, message.sender)
    let conversationId: string

    if (!conversation) {
      const conversationEntity = new ConversationEntity({
        id: uuidV4(),
        participant1Id: message.sender,
        participant2Id: message.receiver,
        messagesId: [],
      });

      await this.createConversationRepository.execute(conversationEntity);

      conversationId = conversationEntity.id
    }

    const messageToSend = new MessageEntity({
      content: message.content,
      receiver: message.receiver,
      sender: message.sender,
      id: uuidV4(),
      sentAt: new Date(),
      conversationId: conversationId
    });

    const { encrypted, iv } = this.encryptDecrypt.encrypt(
      messageToSend.content,
    );

    messageToSend.content = encrypted;
    await this.createMessageRepository.execute(messageToSend.toJson());
  }
}
