import { SendMessageDto } from '../dto/send-message.dto';
import { MessageEntity } from '../entities/message.entity';
import { v4 as uuidV4 } from 'uuid';
import { ConversationEntity } from '../entities/conversation.entity';
import { Inject } from '@nestjs/common';
import { IEncryptDecryptProvider } from '@/shared/providers/encrypt-decrypt.interface';
import { ICreateMessageRepository } from '../database/repositories/create-message.repository';
import { ICreateConversationRepository } from '../database/repositories/create-conversation.repository';
import { IShowConversationPerUsernamesRepository } from '../database/repositories/show-conversation-per-username.repository';
import { BadRequestError } from '@/shared/errors/bad-request.error';
import { IConversationEventsGateway } from '@/websockets/message/conversation-event-gateway.interface';
import { IShowUserPerUsernameRepository } from '@/user/database/repositories/show-user-per-username.repository';

export class SendMessageUseCase {
  constructor(
    @Inject('CreateConversationRepository')
    private readonly createConversationRepository: ICreateConversationRepository,
    @Inject(`CreateMessageRepository`)
    private readonly createMessageRepository: ICreateMessageRepository,
    @Inject('EncryptDecryptProvider')
    private readonly encryptDecrypt: IEncryptDecryptProvider,
    @Inject('ShowConversationRepository')
    private readonly showConversationRepository: IShowConversationPerUsernamesRepository,
    @Inject('ShowUserPerUsernameRepository')
    private readonly showUserPerUsernameRepository: IShowUserPerUsernameRepository,
    @Inject('ConversationEventsGateway')
    private readonly messageeventsgateway: IConversationEventsGateway,
  ) { }

  async send(message: SendMessageDto) {
    try {
      const receiverIsValid = await this.showUserPerUsernameRepository.execute(
        message.receiver,
      );
      const senderIsValid = await this.showUserPerUsernameRepository.execute(
        message.sender,
      );

      if (!receiverIsValid || !senderIsValid) {
        throw new BadRequestError('Sender ou Receiver não encontrado');
      }

      //Verificando se já existe uma conversa entre as duas pessoas
      const conversation = await this.showConversationRepository.execute(
        message.sender,
        message.receiver,
      );
      let conversationId = conversation?.id;

      //Caso não tenha nenhuma conversa entre os dois membros, será criado uma
      if (!conversationId) {
        const conversationEntity = new ConversationEntity({
          id: uuidV4(),
          usernameA: message.sender,
          usernameB: message.receiver,
          messages: [],
        });

        conversationId = conversationEntity.id;

        await this.createConversationRepository.execute(conversationEntity);
      }

      const messageToSend = new MessageEntity({
        content: message.content,
        receiver: message.receiver,
        sender: message.sender,
        id: uuidV4(),
        sentAt: new Date(),
        conversationId: conversationId,
      });

      // const { encrypted, iv } = this.encryptDecrypt.encrypt(
      //   messageToSend.content,
      // );
      // messageToSend.content = encrypted;

      this.messageeventsgateway.sendMessage(messageToSend);

      await this.createMessageRepository.execute(messageToSend.toJson());
    } catch (error) {
      if (error.error === 'User not found') {
        throw new BadRequestError('Sender or Receiver not found.');
      } else {
        throw new BadRequestError(
          'An unexpected error occurred. Please try again.',
        );
      }
    }
  }
}
