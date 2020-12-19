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

  it('should store the token in localStorage', () => {
    const prefix = 'Bearer ';
    const body =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im15X2VtYWlsLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.cEHP5JqC-0APiSyCltuSAMmCjQqJFw9YfiHjOBjZPmI';
    const token = prefix + body;

    // when storeToken() is called
    tokenService.storeToken(token);

    // then the token should be stored in localStorage
    expect(localStorage.getItem('token')).toBe(body);
  });

  fit('should determine whether the user is logged in or not', () => {
    // when auth token is not present then the user is not logged in
    expect(tokenService.isUserLoggedIn()).toBeFalse();

    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuX2VtYWlsLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.gDUCVU7FRVzGRXU3VTK45Q5h7of7HNwLlYtrPz1MrJU';

    // set the auth token
    localStorage.setItem('token', token);

    // when the auth token is present then the user is logged in
    expect(tokenService.isUserLoggedIn()).toBeTrue();
  });
});
