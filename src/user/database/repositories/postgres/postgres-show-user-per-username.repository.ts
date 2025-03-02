import { IUserEntity } from '@/user/entities/user.entity';
import { prismaClient } from '@/shared/database/prisma-client';
import { NotFoundError } from '@/shared/errors/not-found.error';
import { IShowUserPerUsernameRepository } from '../show-user-per-username.repository';

export class PostgresShowUserPerUsernameRepository
  implements IShowUserPerUsernameRepository
{
  async execute(username: string): Promise<IUserEntity> {
    const user = await prismaClient.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }
}
