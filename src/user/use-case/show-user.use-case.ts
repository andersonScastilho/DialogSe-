import { BadRequestError } from '@/shared/errors/bad-request.error';
import { UserEntity } from '../entities/user.entity';
import { Inject } from '@nestjs/common';
import { IShowUserPerIdRepository } from '../database/repositories/show-user-per-id.repository';

export class ShowUserUseCase {
  @Inject('ShowUserPerIdRepository')
  private readonly showUserPerIdRepository: IShowUserPerIdRepository;

  async show(data: string) {
    if (!data) {
      throw new BadRequestError('Missing data!');
    }

    const user = await this.showUserPerIdRepository.execute(data);

    const userEntity = new UserEntity(user);

    return userEntity;
  }
}
