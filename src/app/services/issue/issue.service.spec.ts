import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { IssueService } from './issue.service';
import { Issue } from '../../models/issue/issue';
import IssueType from '../../models/enums/issue-type';
import IssueResolution from '../../models/enums/issue-resolution';
import IssueStatus from '../../models/enums/issue-status';
import { UserBuilder } from 'src/app/models/user-builder/user-builder';
import { CommentBuilder } from 'src/app/models/comment-builder/comment-builder';

describe('IssueService', () => {
  let issueService: IssueService;
  let httpTestingController: HttpTestingController;

  let issue: Issue, issue2: Issue;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    issueService = TestBed.inject(IssueService);
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
      assignee: new UserBuilder().username('Me').build(),
      reporter: new UserBuilder().username('Someone').build(),
      comments: [
        new CommentBuilder().content('comment1').owner('jon doe').build(),
        new CommentBuilder().content('comment2').owner('jane doe').build(),
      ],
      votes: 8,
      watchers: ['jon', 'jane'],
      creationTime: new Date(),
      updateTime: new Date(),
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
      assignee: new UserBuilder().username('You').build(),
      reporter: new UserBuilder().username('Someone else').build(),
      comments: [
        new CommentBuilder().content('comment1').owner('jon doe').build(),
        new CommentBuilder().content('comment2').owner('jane doe').build(),
        new CommentBuilder().content('comment3').owner('joe doe').build(),
      ],
      votes: 2,
      watchers: [],
      creationTime: new Date(),
      updateTime: new Date(),
      estimate: new Date(),
    };
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(issueService).toBeTruthy();
  });

  it('should create a new issue', () => {
    // when the "createIssue()" method is invoked with an issue object
    // then the response should be the issue object itself
    issueService.createIssue(issue).subscribe((response) => {
      expect(response).toEqual(issue);
    });

    // expect a 'POST' request with the issue object
    const req = httpTestingController.expectOne(issueService.baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(issue);

    // return the issue back
    req.flush(issue);
  });

  fit('should update an issue', () => {
    // given an updated issue
    const updatedIssue = { ...issue };
    updatedIssue.description = 'new updated description';
    updatedIssue.status = IssueStatus.Done;

    // when updateIssue is invoked with an issue
    // then response with the updated issue
    issueService.updateIssue(issue).subscribe((response) => {
      expect(response).toEqual(updatedIssue);
    });

    // expect a 'PUT' request with the issue as body
    const req = httpTestingController.expectOne(
      `${issueService.baseUrl}/${issue.id}`
    );

    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toBe(issue);

    // return the updated issue
    req.flush(updatedIssue);
  });

  it('should get a single issue by id', () => {
    // when the "getIssue()" service method is invoked with the issue id
    // then the response should be the issue with the correct id
    issueService.getIssue('1').subscribe((response) => {
      expect(response).toEqual(issue);
    });

    // expect a 'GET' request with the issue id
    const req = httpTestingController.expectOne(`${issueService.baseUrl}/1`);
    expect(req.request.method).toBe('GET');

    // return the issue
    req.flush(issue);
  });

  it('should get a list of issues', () => {
    // given a list of issues
    const issues = [issue, issue2];

    // when the "getIssues()" method is invoked, expect the response to be the list of issues
    issueService.getIssues().subscribe((response) => {
      expect(response).toEqual(issues);
    });

    // expect a 'GET' request
    const req = httpTestingController.expectOne(issueService.baseUrl);
    expect(req.request.method).toBe('GET');

    // return the list of mocked issues
    req.flush(issues);
  });
});
