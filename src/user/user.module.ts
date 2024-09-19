import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './use-case/create-user.use-case';
import { UserController } from './user-controller';
import { BcryptPasswordHashProvider } from './providers/bcrypt-password-hash-provider';
import { UserInMemoryDatabase } from './database/repositories/in-memory/in-memory.database';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
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
