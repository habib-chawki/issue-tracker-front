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

  let issue, issue2: Issue;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(IssueService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    // set up an issue
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

    // set up another issue
    issue2 = {
      id: '2',
      key: 'Rt9xP',
      description: 'Issue 2 description',
      summary: 'Issue 2 summary',
      type: IssueType.Story,
      status: IssueStatus.Todo,
      resolution: IssueResolution.Unresolved,
      assignee: 'You',
      reporter: 'Someone else',
      comments: ['comment1', 'comment2', 'comment3'],
      votes: 2,
      watchers: [],
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

  it('should create a new issue', () => {
    // when the "createIssue()" method is invoked with an issue object
    // then the response should be the issue object itself
    service.createIssue(issue).subscribe((response) => {
      expect(response).toEqual(issue);
    });

    // expect a 'POST' request with the issue object
    const req = httpTestingController.expectOne(service.baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(issue);

    // return the issue back
    req.flush(issue);
  });

  it('should get a single issue by id', () => {
    // when the "getIssue()" service method is invoked with the issue id
    // then the response should be the issue with the correct id
    service.getIssue('1').subscribe((response) => {
      expect(response).toEqual(issue);
    });

    // expect a 'GET' request with the issue id
    const req = httpTestingController.expectOne(`${service.baseUrl}/1`);
    expect(req.request.method).toBe('GET');

    // return the issue
    req.flush(issue);
  });

  it('should get a list of issues', () => {
    // given a list of issues
    const issues = [issue, issue2];

    // when the "getIssues()" method is invoked, expect the response to be the list of issues
    service.getIssues().subscribe((response) => {
      expect(response).toEqual(issues);
    });

    // expect a 'GET' request
    const req = httpTestingController.expectOne(service.baseUrl);
    expect(req.request.method).toBe('GET');

    // return the list of mocked issues
    req.flush(issues);
  });
});
