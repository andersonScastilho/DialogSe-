import { EntityValidationError } from '@/shared/errors/entity-validation.error';
import { UserValidatorFactory } from '../validators/user.validator';

export interface IUserEntity {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password_hash: string;
  createdAt?: Date;
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
  set firstName(firstName: string) {
    UserEntity.validate({ ...this.user, firstName: firstName });
    this.user.firstName = firstName;
  }

  get lastName() {
    return this.user.lastName;
  }
  set lastName(lastName: string) {
    UserEntity.validate({ ...this.user, lastName: lastName });
    this.user.lastName = lastName;
  }
  get username() {
    return this.user.username;
  }
  set username(username: string) {
    this.user.username = username;
  }

  get email() {
    return this.user.email;
  }
  set email(email: string) {
    UserEntity.validate({ ...this.user, email: email });
    this.user.email = email;
  }

  get password_hash() {
    return this.user.password_hash;
  }
  set password_hash(password_hash: string) {
    UserEntity.validate({ ...this.user, password_hash: password_hash });
    this.user.password_hash = password_hash;
  }

  get createdAt() {
    return this.user.createdAt;
  }

  static validate(user: IUserEntity) {
    const validator = UserValidatorFactory.create();

    const isValid = validator.validate(user);

    if (!isValid) {
      throw new EntityValidationError(isValid);
    }
  }

  toJson() {
    return { ...this.user };
  }
}
