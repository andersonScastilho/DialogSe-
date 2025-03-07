import { Module } from '@nestjs/common';
import { SendMessageUseCase } from './use-case/send-message.use-case';
import { MessageController } from './message.controller';
import { CryptoEncryptDecrypt } from './providers/crypto-encrypt-decrypt';
import { PostgresCreateMessageRepository } from './database/repositories/postgres/postgres-create-message.repository';
import { PostgresCreateConversationRepository } from './database/repositories/postgres/postgres-create-conversation.repository';
import { PostgresShowConversationPerUsernamesRepository } from './database/repositories/postgres/postgres-show-conversation-by-username.repository';
import { PostgresShowUserPerIdRepository } from '@/user/database/repositories/postgres/postgres-show-user-per-id.repository';
import { ConversationEventsGateway } from '@/websockets/message/conversation-events.gateway';
import { AuthModule } from '@/auth/auth.module';
import { PostgresShowUserPerUsernameRepository } from '@/user/database/repositories/postgres/postgres-show-user-per-username.repository';
import { ShowConversationPerIdUseCase } from './use-case/show-conversation-per-id.use-case';
import { PostgresShowConversationPerIdRepository } from './database/repositories/postgres/postgres-show-conversation-by-id.repository';
import { PostgresIndexConversationsPerUserRepository } from './database/repositories/postgres/postgres-index-conversations-per-user.repository';
import { IndexConversationPerUserUsecase } from './use-case/index-conversation-per-user.use-case';
import { PostgresConversationExistsBetweenUsernames } from './database/repositories/postgres/postgres-conversation-exists-between-usernames.repository';
import { CreateConversationUseCase } from './use-case/create-conversation.use-case';

@Module({
  controllers: [MessageController],
  imports: [AuthModule],
  providers: [
    SendMessageUseCase,
    ShowConversationPerIdUseCase,
    IndexConversationPerUserUsecase,
    CreateConversationUseCase,
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
      useClass: PostgresShowConversationPerUsernamesRepository,
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
    {
      provide: 'ShowUserPerUsernameRepository',
      useClass: PostgresShowUserPerUsernameRepository,
    },
    {
      provide: 'ShowConversationPerIdRepository',
      useClass: PostgresShowConversationPerIdRepository,
    },
    {
      provide: 'IndexConversationsPerUserRepository',
      useClass: PostgresIndexConversationsPerUserRepository,
    },
    {
      provide: 'ConversationExistsBetweenUsernames',
      useClass: PostgresConversationExistsBetweenUsernames,
    },
  ],
})
export class ConversationModule {}
