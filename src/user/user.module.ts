import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './use-case/create-user.use-case';
import { UserController } from './user-controller';
import { BcryptPasswordHashProvider } from './providers/bcrypt-password-hash-provider';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [CreateUserUseCase,
    {
      provide: 'IHashProvider',
      useClass: BcryptPasswordHashProvider
    }],
})
export class UserModule { }
