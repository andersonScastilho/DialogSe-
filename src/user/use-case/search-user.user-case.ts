import { BadRequestError } from '@/shared/errors/bad-request.error';
import { IUserRepository } from '../database/repositories/user.repository';
import { Inject } from '@nestjs/common';
import { ISearchUserRepository } from '../database/repositories/search-user.repository';

export interface SearchParams {
  filter: string | null;
  sort: string | null;
  sortDir: string | null;
}

export class SearchUserUseCase {
  constructor(
    @Inject('SearchUserRepository')
    private readonly searchUserRepository: ISearchUserRepository,
  ) {}

  async search(searchParams: SearchParams) {
    if (!searchParams.sort || !searchParams.filter) {
      throw new BadRequestError(
        'Está faltando informações, verifique e tente novamente.',
      );
    }

    const result = await this.searchUserRepository.execute(searchParams);

    return result;
  }
}
