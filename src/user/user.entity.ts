import { UserValidator } from "./user.validator";

export interface IUserEntity {
  firstName: string;
  surname: string;
  email: string;
  password?: string;
  created_at?: Date
}

export class UserEntity {
  constructor(private readonly user: IUserEntity) {
    this.validate(user)
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

  validate(data: IUserEntity) {
    const validator = new UserValidator()
    const isValid = validator.validate(data)

    if (!isValid) {
      console.log(validator.errors)
    }
  }
}
