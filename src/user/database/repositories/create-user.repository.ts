import { IUserEntity } from '@/user/entities/user.entity';

export interface ICreateUserRepository {
  execute(input: IUserEntity): Promise<void>;
}
