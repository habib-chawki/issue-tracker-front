import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';

describe('TokenService', () => {
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    tokenService = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(tokenService).toBeTruthy();
  });

  fit('should store the token in localStorage', () => {
    const prefix = 'Bearer ';
    const body = 'GdRhx85$.hTedRU9@.LeSXi8Y5G33';
    const token = prefix + body;

    // when storeToken() is called
    tokenService.storeToken(token);

    // then the token should be stored in localStorage
    expect(localStorage.getItem('token')).toBe(body);
  });
});
