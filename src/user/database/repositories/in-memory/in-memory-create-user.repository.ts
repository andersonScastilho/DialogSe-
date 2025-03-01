import { IUserEntity } from '@/user/entities/user.entity';
import { ICreateUserRepository } from '../create-user.repository';

export class CreateUserRepositoryInMemory implements ICreateUserRepository {
  users: IUserEntity[] = [
    {
      email: 'jonhdoe@gmail.com',
      firstName: 'Jonh',
      lastName: 'Doe',
      username: 'johnzinho',
      id: 'c2ab5a04-88e6-4880-9e40-d4f7ec7dce9e',
      password_hash: '12345678',
    },
  ];

  execute(input: IUserEntity): Promise<void> {
    this.users.push({ ...input });

    return;
  }
}
