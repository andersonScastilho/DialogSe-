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

  get surname() {
    return this.user.surname;
  }

  get email() {
    return this.user.email;
  }

  get password() {
    return this.user.password;
  }
  set password(data: string) {
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
