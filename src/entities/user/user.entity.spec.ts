import { UserEntity } from './user.entity';

describe('Entity User', () => {
  it('Should instantiate the user class', () => {
    const user = new UserEntity({
      firstName: 'John',
      surname: 'Doe',
      email: 'johndoe@test.com',
      age: 15,
      bio: 'Ola',
      password: '123456',
    });

    expect(user).toBeInstanceOf(UserEntity);
  });
});
