import { IUserEntity } from '@/user/entities/user.entity';
import { IShowUserPerIdRepository } from '../show-user-per-id.repository';
import { prismaClient } from '@/shared/database/prisma-client';
import { NotFoundError } from '@/shared/errors/not-found.error';

export class PostgresShowUserPerIdRepository
  implements IShowUserPerIdRepository
{
  async execute(userId: string): Promise<IUserEntity> {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return {
      email: user.email,
      firstName: user.firstName,
      id: user.id,
      lastName: user.lastName,
      password_hash: user.password_hash,
      createdAt: user.createdAt,
    };
  }
}
