import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  storeToken(token: string) {
    // remove the prefix and store the token in localStorage
    token = token.replace('Bearer ', '');
    localStorage.setItem('token', token);
  }
}
