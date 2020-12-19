import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  storeToken(token: string): void {
    // remove the prefix and store the token in localStorage
    token = token.replace('Bearer ', '');
    localStorage.setItem('token', token);
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  storeUserIdentifier(userIdentifier: string): void {
    localStorage.setItem('identifier', userIdentifier);
  }
}
