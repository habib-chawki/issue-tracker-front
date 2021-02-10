import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Issue } from 'src/app/models/issue/issue';

@Injectable({
  providedIn: 'root',
})
export class IssueCommunicationService {
  issueUpdate$ = new Subject<Issue>();
  issueFormSaved$ = new Subject<Issue>();
  displayIssueDetails$ = new Subject<Issue>();

  constructor() {}

  announceIssueUpdate(issue: Issue) {
    this.issueUpdate$.next(issue);
  }

  announceIssueFormSaved(issue: Issue) {
    this.issueFormSaved$.next(issue);
  }

  announceDisplayIssueDetails(issue: Issue) {
    this.displayIssueDetails$.next(issue);
  }
}
