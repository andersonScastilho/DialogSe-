import { IUserEntity } from '@/user/entities/user.entity';

export interface IShowUserPerIdRepository {
  execute(userId: string): Promise<IUserEntity>;
}
