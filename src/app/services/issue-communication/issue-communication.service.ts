import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Issue } from 'src/app/models/issue/issue';

@Injectable({
  providedIn: 'root',
})
export class IssueCommunicationService {
  issueUpdate$ = new Subject<Issue>();

  constructor() {}

  announceIssueUpdate(issue: Issue) {
    this.issueUpdate$.next(issue);
  }
}
