import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserUseCase } from './use-case/create-user.use-case';
import { CreateUserDto } from './dtos/create-user.dto';
import { OutputUserDto } from './dtos/output-user.dto';
import { ShowUserDto } from './dtos/show-user.dto';
import { ShowUserUseCase } from './use-case/show-user.use-case';
import { SignInUserDto } from './dtos/sign-in-user.dto';
import { SignInUserUseCase } from './use-case/sign-in-user.use-case';
import { SearchUserUseCase } from './use-case/search-user.user-case';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly showUserUseCase: ShowUserUseCase,
    private readonly signInUserUseCase: SignInUserUseCase,
    private readonly searchUserUseCase: SearchUserUseCase
  ) { }

  @Post()
  async create(@Body() data: CreateUserDto) {
    const entity = await this.createUserUseCase.create(data);

    const output = OutputUserDto.output(entity);

    return output;
  }

  @Get('search')
  async search(@Body() data: { filter: string, sort: string }) {
    const result = await this.searchUserUseCase.search(data)

    return result
  }

  @Get(':id')
  async show(@Param() data: ShowUserDto) {
    const { id } = data;

    const user = await this.showUserUseCase.show(id);

    const output = OutputUserDto.output(user);

    return output;
  }

  @Post('sign-in')
  async signIn(@Body() body: SignInUserDto) {
    const { email, password } = body

    const acessToken = await this.signInUserUseCase.signIn(email, password)

    return acessToken

  }
}
