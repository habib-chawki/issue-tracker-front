import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  storeToken(token: string): void {
    // remove the prefix and store the token in localStorage
    token = token.replace('Bearer ', '');
    localStorage.setItem('token', token);
  }

  storeUserIdentifier(userIdentifier: string): void {
    localStorage.setItem('identifier', userIdentifier);
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}
