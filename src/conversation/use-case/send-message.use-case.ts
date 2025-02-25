import { SendMessageDto } from '../dto/send-message.dto';
import { MessageEntity } from '../entities/message.entity';
import { v4 as uuidV4 } from 'uuid';
import { ConversationEntity } from '../entities/conversation.entity';
import { Inject } from '@nestjs/common';
import { IEncryptDecryptProvider } from '@/shared/providers/encrypt-decrypt.interface';
import { ICreateMessageRepository } from '../database/repositories/create-message.repository';
import { ICreateConversationRepository } from '../database/repositories/create-conversation.repository';
import { IShowConversationRepository } from '../database/repositories/show-conversation.repository';
import { IShowUserPerIdRepository } from '@/user/database/repositories/show-user-per-id.repository';
import { BadRequestError } from '@/shared/errors/bad-request.error';

export class SendMessageUseCase {
  constructor(
    @Inject('CreateConversationRepository')
    private readonly createConversationRepository: ICreateConversationRepository,
    @Inject(`CreateMessageRepository`)
    private readonly createMessageRepository: ICreateMessageRepository,
    @Inject('EncryptDecryptProvider')
    private readonly encryptDecrypt: IEncryptDecryptProvider,
    @Inject('ShowConversationRepository')
    private readonly showConversationRepository: IShowConversationRepository,
    @Inject('ShowUserPerIdRepository')
    private readonly showUserPerIdRepository: IShowUserPerIdRepository,
  ) {}

  async send(message: SendMessageDto) {
    try {
      const receiverIsValid = await this.showUserPerIdRepository.execute(
        message.receiver,
      );
      const senderIsValid = await this.showUserPerIdRepository.execute(
        message.sender,
      );
      if (!receiverIsValid || !senderIsValid) {
        throw new BadRequestError('Sender ou Receiver não encontrado');
      }

      const conversation = await this.showConversationRepository.execute(
        receiverIsValid.id,
        senderIsValid.id,
      );

      let conversationId: string;
      conversationId = conversation.id;

      if (!conversation) {
        const conversationEntity = new ConversationEntity({
          id: uuidV4(),
          participant1Id: message.sender,
          participant2Id: message.receiver,
          messagesId: [],
        });

        await this.createConversationRepository.execute(conversationEntity);

        conversationId = conversationEntity.id;
      }

      const messageToSend = new MessageEntity({
        content: message.content,
        receiver: message.receiver,
        sender: message.sender,
        id: uuidV4(),
        sentAt: new Date(),
        conversationId: conversationId,
      });

      const { encrypted, iv } = this.encryptDecrypt.encrypt(
        messageToSend.content,
      );

      messageToSend.content = encrypted;
      await this.createMessageRepository.execute(messageToSend.toJson());
    } catch (error) {
      if (error.error === 'User not found') {
        throw new BadRequestError('Sender or Receiver not found.');
      } else {
        throw new BadRequestError(
          'Ocorreu um erro inesperado, tente novamente.',
        );
      }
    }
  }
}
