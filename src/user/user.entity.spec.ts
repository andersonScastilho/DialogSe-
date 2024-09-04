import { UserEntity } from './user.entity';

describe('Entity User', () => {
  it('Should instantiate the user class', () => {
    const user = new UserEntity({
      firstName: 'John',
      surname: 15 as any,
      email: 'johndoe@test.com',
      password: '123456',
    });

  });
});
