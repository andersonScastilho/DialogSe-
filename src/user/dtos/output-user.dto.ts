import { UserEntity } from '../entities/user.entity';

export class OutputUserDto {
  static output(entity: UserEntity) {
    const { password, ...userWithoutPassword } = entity.toJson();

    return {
      ...userWithoutPassword,
    };
  }
}
