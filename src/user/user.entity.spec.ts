import { UserEntity } from './user.entity';

describe('Entity User', () => {
  it('Should instantiate the user class', () => {
    const user = new UserEntity({
      firstName: 'John',
      surname: 'Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });
  });
});
