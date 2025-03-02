import { IUserEntity } from '@/user/entities/user.entity';

export interface IShowUserPerUsernameRepository {
  execute(username: string): Promise<IUserEntity>;
}
