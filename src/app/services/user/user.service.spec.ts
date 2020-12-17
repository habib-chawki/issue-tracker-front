import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let httpTestingController: HttpTestingController;

  let userDetails;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    userService = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
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
    httpTestingController.verify();
  });

  fit('should create the user', () => {
    userService.signUp(userDetails).subscribe((response) => {
      expect(response).toBe(userDetails);
    });

    const req = httpTestingController.expectOne(userService.baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(userDetails);

    req.flush(userDetails);
  });
});
