import { AuthService } from "@/auth/auth.service";
import { IUserRepository } from "../database/repositories/user.repository";
import { Inject } from "@nestjs/common";
import { IHashProvider } from "@/shared/providers/hash-provider.interface";
import { UnauthorizedError } from "@/shared/errors/unauthorized.error";

export class SignInUserUseCase {
    constructor(
        @Inject('HashProvider')
        private readonly hashProvider: IHashProvider,
        @Inject('UserRepository')
        private readonly userRepository: IUserRepository,
        private readonly authService: AuthService) { }

    async signIn(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email)

        const passwordIsMatch = await this.hashProvider.compare(password, user.password)

        if (!passwordIsMatch) {
            throw new UnauthorizedError('Email ou senha incorreto.')
        }

        const acessToken = await this.authService.generateTokenJwt(user.id)

        return acessToken
    }
}