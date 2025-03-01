import { ConflictError } from '@/shared/errors/conflict.error';
import { IEmailAlreadyInUseRepository } from '../email-already-in-use.repository';
import { IUserEntity } from '@/user/entities/user.entity';

export class EmailAlreadyInUseInMemoryRepository
  implements IEmailAlreadyInUseRepository {
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

  execute(email: string): Promise<void> {
    const alreadyExists = this.users.some((user) => user.email === email);

    if (alreadyExists) {
      throw new ConflictError('Email already exists!');
    }

    return;
  }
}
