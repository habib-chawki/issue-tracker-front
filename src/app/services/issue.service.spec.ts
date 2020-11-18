import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { IssueService } from './issue.service';
import { Issue } from '../models/issue';
import IssueType from '../models/enums/issue-type';
import IssueResolution from '../models/enums/issue-resolution';
import IssueStatus from '../models/enums/issue-status';

describe('IssueService', () => {
  let service: IssueService;
  let httpTestingController: HttpTestingController;

  let issue: Issue;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(IssueService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    issue = {
      id: '1',
      key: 'Dh85m',
      description: 'Issue description',
      summary: 'Issue summary',
      type: IssueType.Bug,
      status: IssueStatus.InProgress,
      resolution: IssueResolution.Duplicate,
      assignee: 'Me',
      reporter: 'Someone',
      comments: ['comment1', 'comment2'],
      votes: 8,
      watchers: ['jon', 'jane'],
      created: new Date(),
      updated: new Date(),
      estimate: new Date(),
    };
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a list of issues', () => {
    // given a list of mocked issues
    const issues = [{} as Issue, {} as Issue];

    // when the "getIssues()" method is invoked, expect the response to be the list of issues
    service.getIssues().subscribe((response) => {
      expect(response).toEqual(issues);
    });

    // mock http controller and expect a 'GET' request
    const req = httpTestingController.expectOne('http://localhost:80/issues');
    expect(req.request.method).toBe('GET');

    // return the list of mocked issues
    req.flush(issues);
  });

  it('should get a single issue by id', () => {
    // when the "getIssue()" service method is invoked, expect the response to be the issue
    service.getIssue('1').subscribe((response) => {
      expect(response).toEqual(issue);
    });

    // expect a 'GET' request with the issue id
    const req = httpTestingController.expectOne('http://localhost:80/issues/1');
    expect(req.request.method).toBe('GET');

    // return the issue
    req.flush(issue);
  });

  fit('should create a new issue', () => {
    service.createIssue(issue).subscribe((response) => {
      expect(response).toEqual(issue);
    });

    // expect a 'POST' request with the issue
    const req = httpTestingController.expectOne('http://localhost:80/issues');
    expect(req.request.method).toBe('POST');

    // return the issue back
    req.flush(issue);
  });
});
