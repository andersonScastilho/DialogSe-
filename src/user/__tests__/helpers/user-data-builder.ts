import { CreateUserDto } from '@/user/dtos/create-user.dto';
import { IUserEntity } from '@/user/entities/user.entity';
import { faker } from '@faker-js/faker';

interface Props extends Partial<CreateUserDto> { }

export function UserDataBuilder(data: Props) {
  return {
    email: data.email ?? faker.internet.email(),
    firstName: data.firstName ?? faker.person.firstName(),
    lastName: data.lastName ?? faker.person.lastName(),
    password: data.password ?? faker.internet.password(),
  };
}

interface PropsEntity extends Partial<IUserEntity> { }

export function UserEntityDataBuilder(data: PropsEntity): IUserEntity {
  return {
    email: data.email ?? faker.internet.email(),
    firstName: data.firstName ?? faker.person.firstName(),
    lastName: data.lastName ?? faker.person.lastName(),
    password_hash: data.password_hash ?? faker.internet.password(),
    id: data.id ?? faker.string.uuid()
  };
}

