import { TestBed } from '@angular/core/testing';
import IssueResolution from 'src/app/models/enums/issue-resolution';
import IssueStatus from 'src/app/models/enums/issue-status';
import IssueType from 'src/app/models/enums/issue-type';
import { IssueBuilder } from 'src/app/models/issue-builder/issue-builder';
import { Issue } from 'src/app/models/issue/issue';

import { IssueCommunicationService } from './issue-communication.service';

describe('IssueCommunicationService', () => {
  let service: IssueCommunicationService;
  let issueFormValue;

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
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should announce that the issue is created', () => {
    let receivedIssue;

    service.issueCreated.subscribe((response) => {
      receivedIssue = response;
    });

    service.announceIssueCreated(issueFormValue);

    expect(receivedIssue).toEqual(issueFormValue);
  });
});
