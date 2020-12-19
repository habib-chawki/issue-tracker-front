import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  TOKEN_PREFIX = 'Bearer ';
  TOKEN_KEY = 'token';
  IDENTIFIER_KEY = 'identifier';

  constructor() {}

  storeToken(token: string): void {
    // remove the prefix and store the token in localStorage
    token = token.replace(this.TOKEN_PREFIX, '');
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  storeUserIdentifier(userIdentifier: string): void {
    localStorage.setItem(this.IDENTIFIER_KEY, userIdentifier);
  }

  storeUserDetails({ userIdentifier, token }) {
    this.storeUserIdentifier(userIdentifier);
    this.storeToken(token);
  }

  getUserIdentifier() {
    return localStorage.getItem(this.IDENTIFIER_KEY);
  }

  isUserLoggedIn(): boolean {
    // both user identifier and auth token should be present for the user to be logged in
    return localStorage.getItem(this.TOKEN_KEY) &&
      localStorage.getItem(this.IDENTIFIER_KEY)
      ? true
      : false;
  }
}
