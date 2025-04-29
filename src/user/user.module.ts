import { Module } from '@nestjs/common';
import { UserController } from './user-controller';
import { UserInMemoryDatabase } from './database/repositories/in-memory/in-memory.database';
import { ShowUserUseCase } from './use-case/show-user.use-case';
import { AuthModule } from '@/auth/auth.module';
import { SignInUserUseCase } from './use-case/sign-in-user.use-case';
import { BcryptPasswordHashProvider } from './providers/bcrypt-password-hash-provider';
import { SearchUserUseCase } from './use-case/search-user.user-case';
import { PostgresCreateUserRepository } from './database/repositories/postgres/postgres-create-user.repository';
import { PostgresEmailAlreadyInUseRepository } from './database/repositories/postgres/postgres-email-already-in-use.repository';
import { PostgresShowUserPerIdRepository } from './database/repositories/postgres/postgres-show-user-per-id.repository';
import { PostgresShowUserPerEmailRepository } from './database/repositories/postgres/postgres-show-user-per-email.repository';
import { PostgresSearchUserRepository } from './database/repositories/postgres/postgres-search-user.repository';
import { PostgresUsernameAlreadyInUseRepository } from './database/repositories/postgres/postgres-username-already-in-use.repository';
import { SignUpUserUseCase } from './use-case/sign-up-user.use-case';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [
    SignUpUserUseCase,
    ShowUserUseCase,
    SignInUserUseCase,
    SearchUserUseCase,
    {
      provide: 'HashProvider',
      useClass: BcryptPasswordHashProvider,
    },
    {
      provide: 'UserRepository',
      useClass: UserInMemoryDatabase,
    },
    {
      provide: 'CreateUserRepository',
      useClass: PostgresCreateUserRepository,
    },
    {
      provide: 'EmailAlreadyInUseRepository',
      useClass: PostgresEmailAlreadyInUseRepository,
    },
    {
      provide: 'UsernameAlreadyInUseRepository',
      useClass: PostgresUsernameAlreadyInUseRepository,
    },
    {
      provide: 'ShowUserPerIdRepository',
      useClass: PostgresShowUserPerIdRepository,
    },
    {
      provide: 'ShowUserPerEmailRepository',
      useClass: PostgresShowUserPerEmailRepository,
    },
    {
      provide: 'SearchUserRepository',
      useClass: PostgresSearchUserRepository,
    },
  ],
})
export class UserModule {}
