import { TestBed } from '@angular/core/testing';
import IssueResolution from 'src/app/models/enums/issue-resolution';
import IssueStatus from 'src/app/models/enums/issue-status';
import IssueType from 'src/app/models/enums/issue-type';
import { IssueBuilder } from 'src/app/models/issue-builder/issue-builder';
import { Issue } from 'src/app/models/issue/issue';

import { IssueCommunicationService } from './issue-communication.service';

describe('IssueCommunicationService', () => {
  let service: IssueCommunicationService;
  let issueFormValue, issue: Issue;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssueCommunicationService);

    issueFormValue = {
      description: 'description',
      summary: 'summary',
      type: IssueType.Bug,
      status: IssueStatus.Done,
      resolution: IssueResolution.Duplicate,
      assignee: null,
      estimate: new Date(),
    };

    issue = new IssueBuilder().id('500').summary('issue summary').build();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should announce that the issue is created', () => {
    let response;

    service.issueCreated.subscribe((res) => {
      response = res;
    });

    service.announceIssueCreated(issueFormValue);

    expect(response).toEqual(issueFormValue);
  });

  it('should announce that the issue is clicked', () => {
    let response: Issue;

    service.issueClicked.subscribe((res: Issue) => {
      response = res;
    });

    service.announceIssueClicked(issue);

    expect(response).toEqual(issue);
  });
});
