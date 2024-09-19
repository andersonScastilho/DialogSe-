import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { IHashProvider } from '@/shared/providers/hash-provider.interface';
import { IUserRepository } from '../database/repositories/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('HashProvider')
    public readonly BcryptPasswordHashProvider: IHashProvider,
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async create(data: CreateUserDto) {
    const entity = new UserEntity(data);

    const passowrd_hash = await this.BcryptPasswordHashProvider.hash(
      entity.password_hash,
    );

    entity.password_hash = passowrd_hash;

    await this.userRepository.create(data);

    return entity;
  }
}
