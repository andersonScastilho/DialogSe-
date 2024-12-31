import { IUserEntity } from '@/user/entities/user.entity';
import { SearchParams } from '@/user/use-case/search-user.user-case';

export interface ISearchUserRepository {
  execute(searchParams: SearchParams): Promise<IUserEntity[] | null>;
}
