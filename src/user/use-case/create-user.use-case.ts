import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { IHashProvider } from '@/shared/providers/hash-provider.interface';
import { IUserRepository } from '../database/repositories/user.repository';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('HashProvider')
    public readonly BcryptPasswordHashProvider: IHashProvider,
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) { }

  async create(data: CreateUserDto) {
    //Verificar se o email esta sendo utilizado
    await this.userRepository.emailAlreadyExists(data.email);

    //Gerando id do usuario
    const generatedUserId = uuidV4();

    const entity = new UserEntity({
      email: data.email,
      firstName: data.firstName,
      id: generatedUserId,
      lastName: data.lastName,
      password_hash: data.password
    });

    //Esta hasheando a senha
    const passowrd_hash = await this.BcryptPasswordHashProvider.hash(
      entity.password_hash,
    );

    //Atualizando a entidade com a hash da senha
    entity.password_hash = passowrd_hash;

    //Esta salvando o usuario no banco de dados
    await this.userRepository.create(entity.toJson());

    return entity;
  }
}
