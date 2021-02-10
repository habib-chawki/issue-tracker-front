import { TestBed } from '@angular/core/testing';
import IssueResolution from 'src/app/models/enums/issue-resolution';
import IssueStatus from 'src/app/models/enums/issue-status';
import IssueType from 'src/app/models/enums/issue-type';
import { IssueBuilder } from 'src/app/models/issue-builder/issue-builder';
import { Issue } from 'src/app/models/issue/issue';

import { IssueCommunicationService } from './issue-communication.service';

fdescribe('IssueCommunicationService', () => {
  let service: IssueCommunicationService;
  let issue: Issue;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssueCommunicationService);

    issue = new IssueBuilder()
      .id('500')
      .description('issue description')
      .summary('issue summary')
      .type(IssueType.Story)
      .status(IssueStatus.Done)
      .resolution(IssueResolution.Duplicate)
      .build();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should announce issue update', () => {
    let response: Issue;

    service.issueUpdate$.subscribe((res: Issue) => {
      response = res;
    });

    service.announceIssueUpdate(issue);

    expect(response).toEqual(issue);
  });

  it('should announce issue form saved', () => {
    let response: Issue;

    service.issueFormSaved$.subscribe((res: Issue) => {
      response = res;
    });

    service.announceIssueFormSaved(issue);

    expect(response).toEqual(issue);
  });
});
