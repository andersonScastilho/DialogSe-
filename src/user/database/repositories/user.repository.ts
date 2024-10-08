import { IUserEntity } from '@/user/entities/user.entity';
import { SearchParams } from '@/user/use-case/search-user.user-case';

export interface IUserRepository {
  create(input: IUserEntity): Promise<void>;
  emailAlreadyExists(input: string): Promise<void>;
  findByEmail(input: string): Promise<IUserEntity | null>;
  findById(input: string): Promise<IUserEntity | null>;
  search(searchParams: SearchParams): Promise<IUserEntity[] | null>
}
