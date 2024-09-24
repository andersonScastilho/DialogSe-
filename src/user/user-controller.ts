import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserUseCase } from './use-case/create-user.use-case';
import { CreateUserDto } from './dtos/create-user.dto';
import { OutputUserDto } from './dtos/output-user.dto';
import { ShowUserDto } from './dtos/show-user.dto';
import { ShowUserUseCase } from './use-case/show-user.use-case';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly showUserUseCase: ShowUserUseCase,
  ) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    const entity = await this.createUserUseCase.create(data);

    const output = OutputUserDto.output(entity);

    return output;
  }

  @Get(':id')
  async show(@Param() data: ShowUserDto) {
    const { id } = data;

    const user = await this.showUserUseCase.show(id);

    const output = OutputUserDto.output(user);

    return output;
  }
}
