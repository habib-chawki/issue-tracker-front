import { HttpResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StorageService } from '../storage/storage.service';

import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let storageService: StorageService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    userService = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
    storageService = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  afterEach(() => {
    // verify that no unmatched requests are outstanding
    httpTestingController.verify();
  });

  describe('POST', () => {
    let userSignupCredentials, userLoginCredentials;
    let token, response;

    beforeEach(() => {
      // set the auth token
      token = 'Bearer ss54dffghj.F241GzqxdTJsdeSDF.xcvxqsdf5QSDHGsdf$';

      // set the response headers and status
      response = {
        headers: {
          Authorization: token,
        },
        status: 200,
        statusText: 'OK',
      };

      userSignupCredentials = {
        firstName: 'someone',
        lastName: 'something',
        username: 'one.thing',
        email: 'stephen.king@email.com',
        password: 'Redman',
      };

      userLoginCredentials = {
        email: 'yuval.noah@email.com',
        password: 'sapiens',
      };
    });

    it('should handle user signup', () => {
      // when a signup post request is made
      // then the response header should contain the auth token
      userService
        .signUp(userSignupCredentials)
        .subscribe((response: HttpResponse<any>) => {
          expect(response.body).toBe(userSignupCredentials);
          expect(response.headers.get('Authorization')).toBe(token);
          expect(response.status).toBe(200);
        });

      // expect a post request with the user details to sign up the user
      const req = httpTestingController.expectOne(userService.signupUrl);

      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(userSignupCredentials);

      // return the auth token with a 200 status code
      req.flush(userSignupCredentials, response);
    });

    it('should handle user login', () => {
      // when a login post request is made
      // then the 200 response header should contain the auth token
      userService
        .login(userLoginCredentials)
        .subscribe((response: HttpResponse<any>) => {
          expect(response.body).toBe(userLoginCredentials);
          expect(response.headers.get('Authorization')).toBe(token);
          expect(response.status).toBe(200);
        });

      // expect a post request with the user credentials to log the user in
      const req = httpTestingController.expectOne(userService.loginUrl);

      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(userLoginCredentials);

      // return the user credentials and auth token with a 200 status code
      req.flush(userLoginCredentials, response);
    });
  });
});
