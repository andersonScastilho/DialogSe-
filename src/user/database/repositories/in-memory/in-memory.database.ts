import { IUserEntity, UserEntity } from '@/user/entities/user.entity';
import { IUserRepository } from '../user.repository';
import { ConflictError } from '@/shared/errors/conflict.error';
import { NotFoundError } from '@/shared/errors/not-found.error';

export class UserInMemoryDatabase implements IUserRepository {
  users: IUserEntity[] = [
    {
      email: 'jonhdoe@gmail.com',
      firstName: 'Jonh',
      lastName: 'Doe',
      id: 'c2ab5a04-88e6-4880-9e40-d4f7ec7dce9e',
      password_hash: '12345678',
    },
  ];

  constructor() { }

  async findById(input: string) {
    const [user] = this.users.filter((user) => user.id === input);

    if (!user) {
      throw new NotFoundError('User Not found!');
    }

    return { ...user };
  }

  async create(input: IUserEntity) {
    this.users.push({ ...input });

    return;
  }

  async findByEmail(input: string) {
    const [user] = this.users.filter((user) => user.email === input);

    if (!user) {
      throw new NotFoundError('User not found!');
    }

    return { ...user };
  }

  async emailAlreadyExists(input: string) {
    const alreadyExists = this.users.some((user) => user.email === input);

    if (alreadyExists) {
      throw new ConflictError('Email already exists!');
    }

    return;
  }
}
