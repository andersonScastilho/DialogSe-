import { AuthService } from "@/auth/auth.service";
import { Inject } from "@nestjs/common";
import { IHashProvider } from "@/shared/providers/hash-provider.interface";
import { UnauthorizedError } from "@/shared/errors/unauthorized.error";
import { IShowUserPerEmailRepository } from "../database/repositories/show-user-per-email.repository";

export class SignInUserUseCase {
    constructor(
        @Inject('HashProvider')
        private readonly hashProvider: IHashProvider,
        @Inject('ShowUserPerEmailRepository')
        private readonly showUserPerEmailRepository: IShowUserPerEmailRepository,
        private readonly authService: AuthService) { }

    async signIn(email: string, password_hash: string) {
        const user = await this.showUserPerEmailRepository.execute(email)

        const passwordIsMatch = await this.hashProvider.compare(password_hash, user.password_hash)

        if (!passwordIsMatch) {
            throw new UnauthorizedError('Incorrect email or password.')
        }

        const acessToken = await this.authService.generateTokenJwt(user.id)

        return acessToken
    }
}