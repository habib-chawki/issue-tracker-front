import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Issue } from 'src/app/models/issue/issue';

@Injectable({
  providedIn: 'root',
})
export class IssueCommunicationService {
  issueCreated = new Subject();
  issueClicked = new Subject<Issue>();
  issueUpdated = new Subject<Issue>();

  constructor() {}

  announceIssueCreated(issueFormValue) {
    this.issueCreated.next(issueFormValue);
  }

  announceIssueClicked(issue: Issue) {
    this.issueClicked.next(issue);
  }

  announceIssueUpdated(issue: Issue) {
    this.issueUpdated.next(issue);
  }
}
