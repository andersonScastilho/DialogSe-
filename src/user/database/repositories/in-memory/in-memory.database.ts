import { IUserEntity } from '@/user/entities/user.entity';
import { IUserRepository } from '../user.repository';
import { ConflictValidationError } from '@/shared/errors/conflict-validation.error';

export class UserInMemoryDatabase implements IUserRepository {
  users: IUserEntity[] = [];

  constructor() { }

  async create(input: IUserEntity) {
    this.users.push({ ...input });

    return;
  }

  async findByEmail(input: string) {
    const [user] = this.users.filter((user) => user.email === input);

    if (!user) {
      throw new Error('User not found!');
    }

    return user;
  }

  async emailAlreadyExists(input: string) {
    const alreadyExists = this.users.some((user) => user.email === input);

    if (alreadyExists) {
      throw new ConflictValidationError('Email already exists!')
    }

    return;
  }
}
