import { Module } from '@nestjs/common';
import { ConversationInMemoryDatabase } from './database/in-memory/conversation-in-memory.database';
import { MessageUseCase } from './use-case/message.use-case';
import { MessageInMemoryDatabase } from './database/in-memory/message-in-memory.database';
import { MessageController } from './message.controller';
import { CryptoEncryptDecrypt } from './providers/crypto-encrypt-decrypt';
import { PostgresCreateMessageRepository } from './database/postgres/postgres-create-message.repository';

@Module({
  controllers: [MessageController],
  providers: [
    MessageUseCase,
    {
      provide: 'ConversationRepository',
      useClass: ConversationInMemoryDatabase,
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
