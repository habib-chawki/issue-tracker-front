import { TestBed } from '@angular/core/testing';
import { IssueBuilder } from 'src/app/models/issue-builder/issue-builder';
import { Issue } from 'src/app/models/issue/issue';

import { IssueCommunicationService } from './issue-communication.service';

describe('IssueCommunicationService', () => {
  let service: IssueCommunicationService;
  let issue: Issue;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssueCommunicationService);

    issue = new IssueBuilder().id('500').summary('issue summary !!').build();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should announce that the issue is created', () => {
    let receivedIssue: Issue;

    service.issueCreated.subscribe((response) => {
      receivedIssue = response;
    });

    service.announceIssueCreated(issue);

    expect(receivedIssue).toEqual(issue);
  });
});
