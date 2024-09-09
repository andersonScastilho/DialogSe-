import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { hash } from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  constructor() { }

  async create(data: CreateUserDto) {
    const entity = new UserEntity(data);
    const passowrd_hash = await hash(entity.password_hash, 6);

    entity.password_hash = passowrd_hash;

    return entity;
  }
}
