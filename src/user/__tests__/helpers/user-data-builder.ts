import { IUserEntity } from '../../entities/user.entity';
import { faker } from '@faker-js/faker';

interface Props extends Partial<IUserEntity> { }

export function UserDataBuilder(data: Props): IUserEntity {
  return {
    email: data.email ?? faker.internet.email(),
    firstName: data.firstName ?? faker.person.firstName(),
    password_hash: data.password_hash ?? faker.internet.password(),
    lastName: data.lastName ?? faker.person.lastName(),
    id: data.id ?? faker.string.uuid(),
  };
}
