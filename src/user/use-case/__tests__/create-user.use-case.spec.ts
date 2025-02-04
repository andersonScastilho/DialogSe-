import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from '../create-user.use-case';
import { UserDataBuilder } from '@/user/__tests__/helpers/user-data-builder';
import { UserEntity } from '@/user/entities/user.entity';
import { ConflictError } from '@/shared/errors/conflict.error';
import { BcryptPasswordHashProvider } from '@/user/providers/bcrypt-password-hash-provider';
import { CreateUserRepositoryInMemory } from '@/user/database/repositories/in-memory/in-memory-create-user.repository';
import { EmailAlreadyInUseInMemoryRepository } from '@/user/database/repositories/in-memory/in-memory-email-aready-in-use.repository';
import { EntityValidationError } from '@/shared/errors/entity-validation.error';

describe('Create User Use Case', () => {
  let sut: CreateUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: 'HashProvider',
          useClass: BcryptPasswordHashProvider,
        },
        {
          provide: 'CreateUserRepository',
          useClass: CreateUserRepositoryInMemory,
        },
        {
          provide: 'EmailAlreadyInUseRepository',
          useClass: EmailAlreadyInUseInMemoryRepository,
        },
      ],
    }).compile();

    sut = module.get<CreateUserUseCase>(CreateUserUseCase);

    await sut.create(UserDataBuilder({}));
  });

  it('It should be possible to create a user', async () => {
    const user = await sut.create(UserDataBuilder({}));

    expect(user).toBeInstanceOf(UserEntity);
  });

  it('It is not possible to create a user, as the email is already being used', async () => {
    expect(
      async () =>
        await sut.create(
          UserDataBuilder({
            email: 'jonhdoe@gmail.com',
          }),
        ),
    ).rejects.toBeInstanceOf(ConflictError);
  });

  it('It is not possible to create a user without firstname', async () => {
    let user = UserDataBuilder({});
    user.firstName = '';

    expect(async () => await sut.create(user)).rejects.toBeInstanceOf(
      EntityValidationError,
    );
  });

  it('It is not possible to create a user without lastname', async () => {
    let user = UserDataBuilder({});
    user.lastName = '';

    expect(async () => await sut.create(user)).rejects.toBeInstanceOf(
      EntityValidationError,
    );
  });

  it('It is not possible to create a user without email', async () => {
    let user = UserDataBuilder({});
    user.email = '';

    expect(async () => await sut.create(user)).rejects.toBeInstanceOf(
      EntityValidationError,
    );
  });

  it('It is not possible to create a user without password', async () => {
    let user = UserDataBuilder({});
    user.password = '';

    expect(async () => await sut.create(user)).rejects.toBeInstanceOf(
      EntityValidationError,
    );
  });
});
