import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface IPayloadJwtToken {
  sub: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateTokenJwt(userId: string) {
    const payload: IPayloadJwtToken = {
      sub: userId,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWTSECRET,
    });

    return { accessToken };
  }

  verifyTokenJwt(accessToken: string) {
    const accessTokenPayload: IPayloadJwtToken = this.jwtService.verify(
      accessToken,
      {
        secret: process.env.JWTSECRET,
      },
    );

    return { ...accessTokenPayload };
  }
}
