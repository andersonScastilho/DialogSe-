import { Test, TestingModule } from '@nestjs/testing';
import { ShowUserUseCase } from '../show-user.use-case';
import { UserInMemoryDatabase } from '@/user/database/repositories/in-memory/in-memory.database';
import { ShowUserPerIdRepositoryInMemory } from '@/user/database/repositories/in-memory/in-memory-show-user-per-id.repository';
import { BadRequestError } from '@/shared/errors/bad-request.error';

describe('Show User Use Case', () => {
  let sut: ShowUserUseCase;
  let users: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShowUserUseCase,
        {
          provide: 'ShowUserPerIdRepository',
          useClass: ShowUserPerIdRepositoryInMemory,
        },
      ],
    }).compile();

    sut = module.get<ShowUserUseCase>(ShowUserUseCase);

    users = new UserInMemoryDatabase().users;
  });

  it('It should be possible to show a user', async () => {
    const entity = await sut.show('c2ab5a04-88e6-4880-9e40-d4f7ec7dce9e');

    const result = entity.toJson();

    expect(result).toStrictEqual(users[0]);
  });

  it('It is not possible to show a user without id', async () => {
    expect(async () => await sut.show('')).rejects.toBeInstanceOf(
      BadRequestError,
    );
  });
});
