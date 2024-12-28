import { Module } from '@nestjs/common';
import { MessageUseCase } from './use-case/message.use-case';
import { MessageController } from './message.controller';
import { CryptoEncryptDecrypt } from './providers/crypto-encrypt-decrypt';
import { PostgresCreateMessageRepository } from './database/repositories/postgres/postgres-create-message.repository';
import { PostgresCreateConversationRepository } from './database/repositories/postgres/postgres-create-conversation.repository';

@Module({
  controllers: [MessageController],
  providers: [
    MessageUseCase,
    {
      provide: 'CreateConversationRepository',
      useClass: PostgresCreateConversationRepository
    },
    {
      provide: 'CreateMessageRepository',
      useClass: PostgresCreateMessageRepository,
    },
    {
      provide: 'EncryptDecryptProvider',
      useClass: CryptoEncryptDecrypt,
    },
  ],
})
export class ConversationModule { }
