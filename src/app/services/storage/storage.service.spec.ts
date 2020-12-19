import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
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
    const body =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhcnBlci5sZWVAZW1haWwuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ.67U0lz822lIIsUNyotQgq1zkWNp-ci-8aMJN0rNTroI';
    const token = storageService.TOKEN_PREFIX + body;

    // when storeToken() is called
    storageService.storeToken(token);

    // then the token should be stored in localStorage
    expect(localStorage.getItem(storageService.TOKEN_KEY)).toBe(body);
  });

  it('should store the user identifier in localStorage', () => {
    const userIdentifier = 'harper.lee@email.com';

    // user identifier should not be present in localStorage at first
    expect(localStorage.getItem(storageService.IDENTIFIER_KEY)).toBeNull();

    storageService.storeUserIdentifier(userIdentifier);

    // expect the user identifier to have been stored successfully
    expect(localStorage.getItem(storageService.IDENTIFIER_KEY)).toBe(
      userIdentifier
    );
  });

  it('should determine whether the user is logged in or not', () => {
    // when auth token or user identifier are not present then the user is not logged in
    expect(storageService.isUserLoggedIn()).toBeFalse();

    const userIdentifier = 'oscar.wilde@email.com';
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9zY2FyLndpbGRlQGVtYWlsLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.BzUcqIyceAhNxi1hHtwryF1pgL4iBM_Qc_bpVdZwlnI';

    // set the auth token and user identifier
    localStorage.setItem(storageService.TOKEN_KEY, token);
    localStorage.setItem(storageService.IDENTIFIER_KEY, userIdentifier);

    // when the auth token is present then the user is logged in
    expect(storageService.isUserLoggedIn()).toBeTrue();
  });

  it('should store both the auth token and user identifier', () => {
    // given the user identifier and auth token
    const userIdentifier = 'george.orwell@email.com';
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdlb3JnZS5vcndlbGxAZW1haWwuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ.Zslw5_Se0mFD2arV82AlQ8ZY0IZyB42G4fSyaiQZgEs';

    storageService.storeUserDetails({ userIdentifier, token });

    // expect both the auth token and user identifier to have been stored successfully
    expect(localStorage.getItem(storageService.IDENTIFIER_KEY)).toBe(
      userIdentifier
    );
    expect(localStorage.getItem(storageService.TOKEN_KEY)).toBe(token);
  });

  it('should get user identifier', () => {
    const userId = 'id@email.com';
    localStorage.setItem(storageService.IDENTIFIER_KEY, userId);
    expect(storageService.getUserIdentifier()).toBe(userId);
  });
});
