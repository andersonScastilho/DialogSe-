import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ConversationModule } from './conversation/conversation.module';

@Module({
  imports: [UserModule, AuthModule, ConversationModule, ConfigModule.forRoot()],
})
export class AppModule { }
