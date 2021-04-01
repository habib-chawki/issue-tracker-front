import { User } from '../user/user';
import { UserBuilder } from './user-builder';

let user: User;

describe('UserBuilder', () => {
  beforeEach(() => {
    user = {
      id: '10',
      userName: 'JonnyDoeDoe',
      fullName: 'jon.doe@email.com',
    };
  });

  it('should create a user', () => {
    const createdUser = new UserBuilder()
      .id(user.id)
      .fullName(user.fullName)
      .userName(user.userName)
      .build();

    expect(createdUser).toEqual(user);
  });
});
