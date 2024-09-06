import { IUserEntity, UserEntity } from '../entities/user.entity';

export class OutputUserDto {
  static output(entity: UserEntity): Partial<IUserEntity> {
    const { password, ...userWithoutPassword } = entity.toJson();

    return {
      ...userWithoutPassword,
    };
  }
}
