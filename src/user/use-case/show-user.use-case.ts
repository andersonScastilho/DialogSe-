import { BadRequestError } from '@/shared/errors/bad-request.error';
import { UserEntity } from '../entities/user.entity';
import { Inject } from '@nestjs/common';
import { IShowUserPerIdRepository } from '../database/repositories/show-user-per-id.repository';

export class ShowUserUseCase {
  @Inject('ShowUserPerIdRepository')
  private readonly showUserPerIdRepository: IShowUserPerIdRepository;

  async show(userId: string) {
    if (!userId) {
      throw new BadRequestError('Missing data!');
    }

    const user = await this.showUserPerIdRepository.execute(userId);

    const userEntity = new UserEntity(user);

    return userEntity;
  }
}
