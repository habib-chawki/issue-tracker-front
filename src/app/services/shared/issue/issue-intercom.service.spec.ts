import { TestBed } from '@angular/core/testing';
import IssueStatus from 'src/app/models/enums/issue-status';
import IssueType from 'src/app/models/enums/issue-type';
import { IssueBuilder } from 'src/app/models/issue-builder/issue-builder';
import { Issue } from 'src/app/models/issue/issue';

import { IssueSharedService } from './issue-intercom.service';

describe('IssueIntercomService', () => {
  let service: IssueSharedService;
  let issue: Issue;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssueSharedService);

    issue = new IssueBuilder()
      .id('500')
      .description('issue description')
      .summary('issue summary')
      .type(IssueType.STORY)
      .status(IssueStatus.IN_PROGRESS)
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

  it('should announce display issue details', () => {
    let response: Issue;

    service.displayIssueDetails$.subscribe((res: Issue) => (response = res));

    service.announceDisplayIssueDetails(issue);

    expect(response).toBe(issue);
  });
});
