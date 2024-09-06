import { EntityValidationError } from '@/shared/errors/entity-validation.error';
import { UserValidator } from '../validators/user.validator';

export interface IUserEntity {
  firstName: string;
  surname: string;
  email: string;
  password: string;
  created_at?: Date;
}

export class UserEntity {
  constructor(private readonly user: IUserEntity) {
    UserEntity.validate(user);
  }

  get firstName() {
    return this.user.firstName;
  }
  set firstName(data: string) {
    UserEntity.validate({ ...this.user, firstName: data })
    this.user.firstName = data
  }

  get surname() {
    return this.user.surname;
  }
  set surname(data: string) {
    UserEntity.validate({ ...this.user, surname: data })
    this.user.surname = data
  }

  get email() {
    return this.user.email;
  }
  set email(data: string) {
    UserEntity.validate({ ...this.user, email: data })
    this.user.email = data

  }

  get password() {
    return this.user.password;
  }
  set password(data: string) {
    UserEntity.validate({ ...this.user, password: data })
    this.user.password = data;
  }

  static validate(data: IUserEntity) {
    const validator = new UserValidator();
    const isValid = validator.validate(data);

    if (!isValid) {
      throw new EntityValidationError(isValid);
    }
  }

  toJson() {
    return this.user;
  }
}
