import { Module } from '@nestjs/common';
// import { SendMessageUseCase } from './use-case/send-message.use-case';
import { MessageController } from './message.controller';
import { CryptoEncryptDecrypt } from './providers/crypto-encrypt-decrypt';
// import { PostgresCreateMessageRepository } from './database/repositories/postgres/postgres-create-message.repository';
import { PostgresCreateConversationRepository } from './database/repositories/postgres/postgres-create-conversation.repository';
import { PostgresShowUserPerIdRepository } from '@/user/database/repositories/postgres/postgres-show-user-per-id.repository';
import { ConversationEventsGateway } from '@/websockets/message/conversation-events.gateway';
import { AuthModule } from '@/auth/auth.module';
import { PostgresShowUserPerUsernameRepository } from '@/user/database/repositories/postgres/postgres-show-user-per-username.repository';
import { CreateConversationUseCase } from './use-case/create-conversation.use-case';

@Module({
  controllers: [MessageController],
  imports: [AuthModule],
  providers: [
    // SendMessageUseCase,
    CreateConversationUseCase,
    {
      provide: 'CreateConversationRepository',
      useClass: PostgresCreateConversationRepository,
    },
    // {
    //   provide: 'CreateMessageRepository',
    //   useClass: PostgresCreateMessageRepository,
    // },

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
  ],
})
export class ConversationModule {}
