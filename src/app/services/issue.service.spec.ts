import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { IssueService } from './issue.service';
import { Issue } from '../models/issue';

describe('IssueService', () => {
  let service: IssueService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(IssueService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('should get a list of issues', () => {
    // given a list of mocked issues
    const mockIssues = [{} as Issue, {} as Issue];

    // when the "getIssues()" method is invoked then the list of mocked issues should be returned
    service.getIssues().subscribe((issues) => {
      expect(issues).toEqual(mockIssues);
    });

    // mock http controller and expect a 'GET' request
    const req = httpTestingController.expectOne('http://localhost:80/issues');
    expect(req.request.method).toBe('GET');

    // return the list of mocked issues
    req.flush(mockIssues);
  });
});
