import { IUserRepository } from "@/user/database/repositories/user.repository";
import { JwtService } from "@nestjs/jwt";

export interface IPayloadJwtToken {
    sub: string,
    username: string
}


export class AuthServiceJwt {

    constructor(private readonly jwtService: JwtService, private readonly userRepository: IUserRepository) { }
    async generateTokenJwt(userId: string) {

        const user = await this.userRepository.findById(userId)

        const payload: IPayloadJwtToken = {
            sub: user.id,
            username: `${user.firstName}`
        }

        const acessToken = this.jwtService.sign(payload)

        return { acessToken }
    }

    async verifyTokenJwt(acessToken: string) {

        const acessTokenPayload: IPayloadJwtToken = await this.jwtService.verify(acessToken)


        return { acessTokenPayload }

    }

}