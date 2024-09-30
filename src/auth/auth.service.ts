import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface IPayloadJwtToken {
  sub: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async generateTokenJwt(userId: string) {
    const payload: IPayloadJwtToken = {
      sub: userId,
    };

    const acessToken = this.jwtService.sign(payload);

    return { acessToken };
  }

  async verifyTokenJwt(acessToken: string) {
    const acessTokenPayload: IPayloadJwtToken =
      await this.jwtService.verify(acessToken);

    return { acessTokenPayload };
  }
}
