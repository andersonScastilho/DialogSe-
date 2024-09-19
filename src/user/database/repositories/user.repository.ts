import { IUserEntity } from '@/user/entities/user.entity';

export interface IUserRepository {
  create(input: IUserEntity): Promise<void>;
  emailAlreadyExists(input: string): Promise<void>;
  findByEmail(input: string): Promise<IUserEntity | null>;
}
