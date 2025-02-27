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
import { IConversationEventsGateway } from '@/websockets/message/conversation-event-gateway.interface';

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
    @Inject('ConversationEventsGateway')
    private readonly messageeventsgateway: IConversationEventsGateway,
  ) { }

  async existsConversastion(participant1Id: string, participant2Id: string): Promise<string | null> {

    return
  }

  async send(data: SendMessageDto) {
    try {

      /*    const receiverIsValid = await this.showUserPerIdRepository.execute(
        message.receiver,
      );
      const senderIsValid = await this.showUserPerIdRepository.execute(
        message.sender,
      );
      if (!receiverIsValid || !senderIsValid) {
        throw new BadRequestError('Sender ou Receiver não encontrado');
      }
      */

      //Verificando se já existe uma conversa entre as duas pessoas
      const conversation = await this.showConversationRepository.execute(data.sender, data.receiver)
      let conversationId = conversation?.id

      //Caso não tenha nenhuma conversa entre os dois membros, será criado uma 
      if (!conversationId) {

        const conversationEntity = new ConversationEntity({
          id: uuidV4(),
          participant1Id: data.sender,
          participant2Id: data.receiver,
          messagesId: [],
        });

        conversationId = conversationEntity.id

        await this.createConversationRepository.execute(conversationEntity);
      }


      const messageToSend = new MessageEntity({
        content: data.content,
        receiver: data.receiver,
        sender: data.sender,
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
        console.log(error)
        throw new BadRequestError(
          'Ocorreu um erro inesperado, tente novamente.',
        );
      }
    }
  }
}


