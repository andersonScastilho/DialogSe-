import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './use-case/create-user.use-case';
import { UserController } from './user-controller';
import { UserInMemoryDatabase } from './database/repositories/in-memory/in-memory.database';
import { ShowUserUseCase } from './use-case/show-user.use-case';
import { AuthModule } from '@/auth/auth.module';
import { SignInUserUseCase } from './use-case/sign-in-user.use-case';
import { BcryptPasswordHashProvider } from './providers/bcrypt-password-hash-provider';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    ShowUserUseCase,
    SignInUserUseCase,
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
export class UserModule { }
