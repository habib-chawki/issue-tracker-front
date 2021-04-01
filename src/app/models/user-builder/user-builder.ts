import { User } from '../user/user';

export class UserBuilder {
  private _user: User;

  constructor() {
    this._user = {
      id: null,
      userName: null,
      fullName: null,
    };
  }

  id(id: string): UserBuilder {
    this._user.id = id;
    return this;
  }

  userName(userName: string): UserBuilder {
    this._user.userName = userName;
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
