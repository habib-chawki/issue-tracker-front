import { User } from '../user/user';
import { UserBuilder } from './user-builder';

let user: User;

describe('UserBuilder', () => {
  beforeEach(() => {
    user = {
      id: '10',
      username: 'JonnyDoeDoe',
      fullName: 'jon.doe@email.com',
    };
  });

  it('should create a user', () => {
    const createdUser = new UserBuilder()
      .id(user.id)
      .fullName(user.fullName)
      .username(user.username)
      .build();

    expect(createdUser).toEqual(user);
  });
});
