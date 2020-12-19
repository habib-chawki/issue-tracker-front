import { TestBed } from '@angular/core/testing';

import { StorageService } from './token.service';

describe('TokenService', () => {
  let storageService: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    storageService = TestBed.inject(StorageService);
  });

  afterEach(() => {
    // clear localStorage after each test
    localStorage.clear();
  });

  it('should be created', () => {
    expect(storageService).toBeTruthy();
  });

  it('should store the auth token in localStorage', () => {
    const prefix = 'Bearer ';
    const body =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im15X2VtYWlsLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.cEHP5JqC-0APiSyCltuSAMmCjQqJFw9YfiHjOBjZPmI';
    const token = prefix + body;

    // when storeToken() is called
    storageService.storeToken(token);

    // then the token should be stored in localStorage
    expect(localStorage.getItem('token')).toBe(body);
  });

  it('should store the user identifier in localStorage', () => {
    const userIdentifier = 'harper.lee@email.com';

    // user identifier should not be present in localStorage at first
    expect(localStorage.getItem('userIdentifier')).toBeNull();

    storageService.storeUserIdentifier(userIdentifier);

    // expect the user identifier to have been stored successfully
    expect(localStorage.getItem('identifier')).toBe(userIdentifier);
  });

  fit('should determine whether the user is logged in or not', () => {
    // when auth token or user identifier are not present then the user is not logged in
    expect(storageService.isUserLoggedIn()).toBeFalse();

    const userIdentifier = 'oscar.wilde@email.com';
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuX2VtYWlsLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.gDUCVU7FRVzGRXU3VTK45Q5h7of7HNwLlYtrPz1MrJU';

    // set the auth token and user identifier
    localStorage.setItem('token', token);
    localStorage.setItem('identifier', userIdentifier);

    // when the auth token is present then the user is logged in
    expect(storageService.isUserLoggedIn()).toBeTrue();
  });
});
