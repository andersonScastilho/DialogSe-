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
        'Está faltando informações, verifique e tente novamente.',
      );
    }
    if (searchParams.sortDir && !searchParams.sort) {
      throw new BadRequestError(
        'Para definir a direção de ordenação, é obrigatório selecionar o campo de ordenação.',
      );
    }
    const result = await this.searchUserRepository.execute(searchParams);

    return result;
  }
}
