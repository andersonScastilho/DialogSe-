import { CreateUserDto } from '@/user/dtos/create-user.dto';
import { IUserEntity } from '@/user/entities/user.entity';
import { faker } from '@faker-js/faker';

interface Props extends Partial<CreateUserDto> { }

export function UserDataBuilder(user: Props) {
  return {
    email: user.email ?? faker.internet.email(),
    firstName: user.firstName ?? faker.person.firstName(),
    lastName: user.lastName ?? faker.person.lastName(),
    password: user.password ?? faker.internet.password(),
    username: user.username ?? faker.internet.username()
  };
}

interface PropsEntity extends Partial<IUserEntity> { }

export function UserEntityDataBuilder(user: PropsEntity): IUserEntity {
  return {
    email: user.email ?? faker.internet.email(),
    firstName: user.firstName ?? faker.person.firstName(),
    lastName: user.lastName ?? faker.person.lastName(),
    password_hash: user.password_hash ?? faker.internet.password(),
    id: user.id ?? faker.string.uuid(),
    username: user.username ?? faker.internet.username()
  };
}

