import { BadRequestError } from '@/shared/errors/bad-request.error';
import { UserEntity } from '../entities/user.entity';
import { IUserRepository } from '../database/repositories/user.repository';
import { Inject } from '@nestjs/common';

export class ShowUserUseCase {
  @Inject('UserRepository')
  private readonly userRepository: IUserRepository;

  async show(data: string) {
    if (!data) {
      throw new BadRequestError('Missing data!');
    }

    const user = await this.userRepository.findById(data);

    const userEntity = new UserEntity(user);

    return userEntity;
  }
}
