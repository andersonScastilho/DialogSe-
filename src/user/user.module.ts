import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './use-case/create-user.use-case';
import { UserController } from './user-controller';
import { BcryptPasswordHashProvider } from './providers/bcrypt-password-hash-provider';
import { UserInMemoryDatabase } from './database/repositories/in-memory/in-memory.database';
import { ShowUserUseCase } from './use-case/show-user.use-case';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    ShowUserUseCase,
    {
      provide: 'HashProvider',
      useClass: BcryptPasswordHashProvider,
    },
    {
      provide: 'UserRepository',
      useClass: UserInMemoryDatabase,
    },
  ],
})
export class UserModule {}
