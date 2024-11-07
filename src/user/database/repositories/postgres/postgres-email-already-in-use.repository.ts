import { prismaClient } from '@/shared/database/prisma-client';
import { ConflictError } from '@/shared/errors/conflict.error';

export class PostgresEmailAlreadyInUseRepository {
  async execute(email: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      throw new ConflictError('Email already in use');
    }

    return;
  }
}
