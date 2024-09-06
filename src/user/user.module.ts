import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './use-case/create-user.use-case';
import { UserController } from './user-controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [CreateUserUseCase],
})
export class UserModule {}
