import { IUserEntity } from '@/user/entities/user.entity';
import { IShowUserPerIdRepository } from '../show-user-per-id.repository';
import { NotFoundError } from '@/shared/errors/not-found.error';

export class ShowUserPerIdRepositoryInMemory
  implements IShowUserPerIdRepository {
  users: IUserEntity[] = [
    {
      email: 'jonhdoe@gmail.com',
      firstName: 'Jonh',
      lastName: 'Doe',
      id: 'c2ab5a04-88e6-4880-9e40-d4f7ec7dce9e',
      username: 'johnzinho',
      password_hash: '12345678',
    },
  ];

  async execute(userId: string): Promise<IUserEntity> {
    const [user] = this.users.filter((user) => user.id === userId);

    if (!user) {
      throw new NotFoundError('User Not found!');
    }

    return { ...user };
  }
}
