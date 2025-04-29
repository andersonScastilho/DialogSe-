import { Inject, Injectable } from '@nestjs/common';
import { SignUpUserDto } from '../dtos/sign-up-user.dto';
import { UserEntity } from '../entities/user.entity';
import { IHashProvider } from '@/shared/providers/hash-provider.interface';
import { v4 as uuidV4 } from 'uuid';
import { ICreateUserRepository } from '../database/repositories/create-user.repository';
import { IEmailAlreadyInUseRepository } from '../database/repositories/email-already-in-use.repository';
import { IUsernameAlreadyInUseRepository } from '../database/repositories/username-already-in-use.repository';

@Injectable()
export class SignUpUserUseCase {
  constructor(
    @Inject('HashProvider')
    public readonly BcryptPasswordHashProvider: IHashProvider,
    @Inject('CreateUserRepository')
    private readonly createUserRepository: ICreateUserRepository,
    @Inject('EmailAlreadyInUseRepository')
    private readonly emailAlreadyInUseRepository: IEmailAlreadyInUseRepository,
    @Inject('UsernameAlreadyInUseRepository')
    private readonly usernameAlreadyInUseRepository: IUsernameAlreadyInUseRepository,
  ) {}

  async create(user: SignUpUserDto) {
    // //Verificar se o email esta sendo utilizado
    await this.emailAlreadyInUseRepository.execute(user.email);

    // //Verificar se o usuario esta sendo utilizado
    await this.usernameAlreadyInUseRepository.execute(user.username);

    //Gerando id do usuario
    const generatedUserId = uuidV4();

    const entity = new UserEntity({
      email: user.email,
      firstName: user.firstName,
      id: generatedUserId,
      username: user.username,
      lastName: user.lastName,
      password_hash: user.password,
      createdAt: new Date(),
    });

    //Esta hasheando a senha
    const passowrd_hash = await this.BcryptPasswordHashProvider.hash(
      entity.password_hash,
    );

    //Atualizando a entidade com a hash da senha
    entity.password_hash = passowrd_hash;

    //Esta salvando o usuario no banco de dados
    await this.createUserRepository.execute(entity.toJson());

    return entity;
  }
}
