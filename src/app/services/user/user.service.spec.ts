import { HttpClient, HttpResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TokenService } from '../token/token.service';

import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let tokenService: TokenService;
  let httpTestingController: HttpTestingController;

  let userDetails;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    userService = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  beforeEach(() => {
    userDetails = {
      firstName: 'someone',
      lastName: 'something',
      username: 'one.thing',
      email: 'stephen.king@email.com',
      password: 'Redman',
    };
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  afterEach(() => {
    // verify that no unmatched requests are outstanding
    httpTestingController.verify();
  });

  it('should create the user', () => {
    // set the auth token
    const token = 'Bearer ss54dffghj.F241GzqxdTJsdeSDF.xcvxqsdf5QSDHGsdf$';

    // when a post request is made to sign up the user
    // then the response header should contain the auth token
    userService.signUp(userDetails).subscribe((response: HttpResponse<any>) => {
      expect(response.body).toBe(userDetails);
      expect(response.headers.get('Authorization')).toBe(token);
      expect(response.status).toBe(200);
    });

    // expect a post request with the user details to sign up the user
    const req = httpTestingController.expectOne(userService.baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(userDetails);

    // return the auth token with a 200 status code
    req.flush(userDetails, {
      headers: {
        Authorization: token,
      },
      status: 200,
      statusText: 'OK',
    });
  });
});
