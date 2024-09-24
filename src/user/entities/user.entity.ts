import { EntityValidationError } from '@/shared/errors/entity-validation.error';
import { UserValidatorFactory } from '../validators/user.validator';

export interface IUserEntity {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  created_at?: Date;
}

export class UserEntity {
  constructor(private readonly user: IUserEntity) {
    UserEntity.validate(user);
  }

  get id() {
    return this.user.id;
  }

  get firstName() {
    return this.user.firstName;
  }
  set firstName(data: string) {
    UserEntity.validate({ ...this.user, firstName: data });
    this.user.firstName = data;
  }

  get lastName() {
    return this.user.lastName;
  }
  set lastName(data: string) {
    UserEntity.validate({ ...this.user, lastName: data });
    this.user.lastName = data;
  }

  get email() {
    return this.user.email;
  }
  set email(data: string) {
    UserEntity.validate({ ...this.user, email: data });
    this.user.email = data;
  }

  get password_hash() {
    return this.user.password;
  }
  set password_hash(data: string) {
    UserEntity.validate({ ...this.user, password: data });
    this.user.password = data;
  }

  static validate(data: IUserEntity) {
    const validator = UserValidatorFactory.create();

    const isValid = validator.validate(data);

    if (!isValid) {
      throw new EntityValidationError(isValid);
    }
  }

  toJson() {
    return { ...this.user };
  }
}
