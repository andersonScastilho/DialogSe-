import { Module } from '@nestjs/common';
import { SendMessageUseCase } from './use-case/send-message.use-case';
import { MessageController } from './message.controller';
import { CryptoEncryptDecrypt } from './providers/crypto-encrypt-decrypt';
import { PostgresCreateMessageRepository } from './database/repositories/postgres/postgres-create-message.repository';
import { PostgresCreateConversationRepository } from './database/repositories/postgres/postgres-create-conversation.repository';
import { PostgresShowConversationRepository } from './database/repositories/postgres/postgres-show-conversation.repository';
import { PostgresShowUserPerIdRepository } from '@/user/database/repositories/postgres/postgres-show-user-per-id.repository';

@Module({
  controllers: [MessageController],
  providers: [
    SendMessageUseCase,
    {
      provide: 'CreateConversationRepository',
      useClass: PostgresCreateConversationRepository,
    },
    {
      provide: 'CreateMessageRepository',
      useClass: PostgresCreateMessageRepository,
    },
    {
      provide: 'ShowConversationRepository',
      useClass: PostgresShowConversationRepository,
    },
    {
      provide: 'ShowUserPerIdRepository',
      useClass: PostgresShowUserPerIdRepository,
    },
    {
      provide: 'EncryptDecryptProvider',
      useClass: CryptoEncryptDecrypt,
    },
  ],
})
export class ConversationModule {}
