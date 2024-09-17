import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { IHashProvider } from '@/shared/providers/hash-provider.interface';

@Injectable()
export class CreateUserUseCase {
  constructor(@Inject('IHashProvider') public readonly BcryptPasswordHashProvider: IHashProvider) { }

  async create(data: CreateUserDto) {
    const entity = new UserEntity(data);
    const passowrd_hash = await this.BcryptPasswordHashProvider.hash(entity.password_hash);

    entity.password_hash = passowrd_hash;

    return entity;
  }
}
