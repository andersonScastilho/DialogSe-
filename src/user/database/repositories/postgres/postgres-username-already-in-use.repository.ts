import { prismaClient } from '@/shared/database/prisma-client';
import { ConflictError } from '@/shared/errors/conflict.error';

export class PostgresUsernameAlreadyInUseRepository {
  async execute(username: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        username: username,
      },
    });

    if (user) {
      throw new ConflictError('Username already in use');
    }

    return;
  }
}
