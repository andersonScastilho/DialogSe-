import { BadRequestError } from '@/shared/errors/bad-request.error';
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
    if (!searchParams.filter) {
      throw new BadRequestError(
        'To set the sorting direction, you must first select a sorting field.',
      );
    }
    if (searchParams.sortDir && !searchParams.sort) {
      throw new BadRequestError(
        'To define the sorting direction, it is mandatory to select the sorting field.',
      );
    }
    const result = await this.searchUserRepository.execute(searchParams);

    return result;
  }
}
