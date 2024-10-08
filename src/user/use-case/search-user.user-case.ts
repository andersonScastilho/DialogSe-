import { BadRequestError } from "@/shared/errors/bad-request.error";
import { IUserRepository } from "../database/repositories/user.repository";
import { Inject } from "@nestjs/common";

export interface SearchParams {
    filter: string | null,
    sort: string | null
}


export class SearchUserUseCase {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: IUserRepository) { }

    async search(searchParams: SearchParams) {

        if (!searchParams.sort || !searchParams.filter) {
            throw new BadRequestError('Está faltando informações, verifique e tente novamente.')
        }

        const result = await this.userRepository.search(searchParams)

        return result
    }
}