import { IUserEntity } from '@/user/entities/user.entity';
import { SearchParams } from '@/user/use-case/search-user.user-case';
import { ISearchUserRepository } from '../search-user.repository';
import { prismaClient } from '@/shared/database/prisma-client';

export class PostgresSearchUserRepository implements ISearchUserRepository {
  async execute(searchParams: SearchParams): Promise<IUserEntity[] | null> {
    const orderBy = searchParams.sort
      ? { [searchParams.sort]: searchParams.sortDir || 'asc' }
      : undefined;

    const result = await prismaClient.user.findMany({
      where: {
        firstName: searchParams.filter,
      },
      orderBy,
    });

    return result;
  }
}
