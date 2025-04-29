import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OutputUserDto } from './dtos/output-user.dto';
import { ShowUserDto } from './dtos/show-user.dto';
import { ShowUserUseCase } from './use-case/show-user.use-case';
import { SignInUserDto } from './dtos/sign-in-user.dto';
import { SignInUserUseCase } from './use-case/sign-in-user.use-case';
import { SearchUserUseCase } from './use-case/search-user.user-case';
import { SearchUserDto } from './dtos/search-user.dto';
import { AuthGuard } from '@/auth/auth.guard';
import { SignUpUserUseCase } from './use-case/sign-up-user.use-case';
import { SignUpUserDto } from './dtos/sign-up-user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly signUpUserUseCase: SignUpUserUseCase,
    private readonly showUserUseCase: ShowUserUseCase,
    private readonly signInUserUseCase: SignInUserUseCase,
    private readonly searchUserUseCase: SearchUserUseCase,
  ) {}

  @Post('sign-up')
  async signUp(@Body() data: SignUpUserDto) {
    const entity = await this.signUpUserUseCase.create(data);

    const output = OutputUserDto.output(entity);

    return output;
  }

  @UseGuards(AuthGuard)
  @Get('search')
  async search(@Body() data: SearchUserDto) {
    const result = await this.searchUserUseCase.search(data);

    return result;
  }

  @UseGuards(AuthGuard)
  @Get('user')
  async show(@Req() req: Request) {
    const userAuth = req['user-auth'];

    const user = await this.showUserUseCase.show(userAuth?.sub);

    const output = OutputUserDto.output(user);

    return output;
  }

  @Post('sign-in')
  async signIn(@Body() body: SignInUserDto) {
    const { email, password } = body;

    const acessToken = await this.signInUserUseCase.signIn(email, password);

    return acessToken;
  }
}
