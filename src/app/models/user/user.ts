export class User {
  private _id: string = '1';
  private _username: string = 'Jon Doe';
  private _email: string = 'jon.doe@email.com';

  constructor() {}

  public get id() {
    return this._id;
  }

  public set id(id) {
    this._id = id;
  }

  public get username() {
    return this._username;
  }

  public set username(username) {
    this._username = username;
  }

  public get email() {
    return this._email;
  }

  public set email(email) {
    this._email = email;
  }
}
