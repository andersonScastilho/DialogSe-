import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from './use-case/create-user.use-case';
import { CreateUserDto } from './dtos/create-user.dto';
import { OutputUserDto } from './dtos/output-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    const entity = await this.createUserUseCase.create(data);

    const output = OutputUserDto.output(entity);

    return output;
  }
}
