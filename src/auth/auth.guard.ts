import { UnauthorizedError } from '@/shared/errors/unauthorized.error';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const acessToken = this.extractAcessTokenFromHeader(request);

    if (!acessToken)
      throw new UnauthorizedError('Expired or unauthorized token.');

    try {
      const acessTokenPayload = this.authService.verifyTokenJwt(acessToken);

      request['user-auth'] = acessTokenPayload;
    } catch (error) {
      throw new UnauthorizedError('Expired or unauthorized token.');
    }

    return true;
  }

  private extractAcessTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
