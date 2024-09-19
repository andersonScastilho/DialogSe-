import { IUserEntity } from '@/user/entities/user.entity';
import { IUserRepository } from '../user.repository';

export class UserInMemoryDatabase implements IUserRepository {
  users: IUserEntity[] = [];

  constructor() {}

  async create(input: IUserEntity): Promise<void> {
    this.users.push({ ...input });

    return;
  }
}
