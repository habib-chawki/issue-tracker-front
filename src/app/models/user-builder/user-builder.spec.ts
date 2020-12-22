import { User } from '../user/user';
import { UserBuilder } from './user-builder';

let user: User;

beforeEach(() => {
  user = {
    id: '10',
    username: 'JonnyDoeDoe',
    email: 'jon.doe@email.com',
  };
});

it('should create a user', () => {
  const createdUser = new UserBuilder()
    .id(user.id)
    .email(user.email)
    .username(user.username).build;

  expect(createdUser).toBe(user);
});
