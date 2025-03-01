import { prismaClient } from '@/shared/database/prisma-client';
import { IUserEntity } from '@/user/entities/user.entity';
import { ICreateUserRepository } from '../create-user.repository';

export class PostgresCreateUserRepository implements ICreateUserRepository {
  async execute(user: IUserEntity) {
    await prismaClient.user.create({
      data: {
        email: user.email,
        firstName: user.firstName,
        username: user.username,
        id: user.id,
        lastName: user.lastName,
        password_hash: user.password_hash,
        createdAt: user.createdAt,
      },
    });

    return;
  }
}
