import { User } from '../user/user';

export class UserBuilder {
  private _user: User;

  constructor() {
    this._user = {
      id: null,
      username: null,
      email: null,
    };
  }

  id(id: string): UserBuilder {
    this._user.id = id;
    return this;
  }

  username(username: string): UserBuilder {
    this._user.username = username;
    return this;
  }

  email(email: string): UserBuilder {
    this._user.email = email;
    return this;
  }

  build(): User {
    return this._user;
  }
}
