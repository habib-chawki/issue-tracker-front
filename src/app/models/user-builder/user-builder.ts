import { User } from '../user/user';

export class UserBuilder {
  private _user: User;

  constructor() {
    this._user = {
      id: null,
      username: null,
      fullName: null,
    };
  }

  id(id: string): UserBuilder {
    this._user.id = id;
    return this;
  }

  username(userName: string): UserBuilder {
    this._user.username = userName;
    return this;
  }

  fullName(fullName: string): UserBuilder {
    this._user.fullName = fullName;
    return this;
  }

  build(): User {
    return this._user;
  }
}
