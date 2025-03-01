import { Module } from '@nestjs/common';
import { SendMessageUseCase } from './use-case/send-message.use-case';
import { MessageController } from './message.controller';
import { CryptoEncryptDecrypt } from './providers/crypto-encrypt-decrypt';
import { PostgresCreateMessageRepository } from './database/repositories/postgres/postgres-create-message.repository';
import { PostgresCreateConversationRepository } from './database/repositories/postgres/postgres-create-conversation.repository';
import { PostgresShowConversationRepository } from './database/repositories/postgres/postgres-show-conversation.repository';
import { PostgresShowUserPerIdRepository } from '@/user/database/repositories/postgres/postgres-show-user-per-id.repository';
import { ConversationEventsGateway } from '@/websockets/message/conversation-events.gateway';
import { AuthModule } from '@/auth/auth.module';

@Module({
  controllers: [MessageController],
  imports: [AuthModule],
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
    {
      provide: 'ConversationEventsGateway',
      useClass: ConversationEventsGateway,
    },
  ],
})
export class ConversationModule {}
