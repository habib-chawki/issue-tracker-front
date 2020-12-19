import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  TOKEN_PREFIX = 'Bearer ';

  constructor() {}

  storeToken(token: string): void {
    // remove the prefix and store the token in localStorage
    token = token.replace(this.TOKEN_PREFIX, '');
    localStorage.setItem('token', token);
  }

  storeUserIdentifier(userIdentifier: string): void {
    localStorage.setItem('identifier', userIdentifier);
  }

  storeUserDetails({ userIdentifier, token }) {
    this.storeUserIdentifier(userIdentifier);
    this.storeToken(token);
  }

  getUserIdentifier() {
    return localStorage.getItem('identifier');
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('token') && localStorage.getItem('identifier')
      ? true
      : false;
  }
}
