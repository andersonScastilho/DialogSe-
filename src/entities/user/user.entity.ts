interface IUserEntity {
  firstName: string;
  surname: string;
  email: string;
  age: number;
  bio: string;
  password: string;
}

export class UserEntity {
  constructor(private readonly user: IUserEntity) {}

  get firstName() {
    return this.user.firstName;
  }

  get surname() {
    return this.user.surname;
  }

  get email() {
    return this.user.email;
  }

  get age() {
    return this.user.age;
  }

  get bio() {
    return this.user.bio;
  }

  get password() {
    return this.user.password;
  }
}
