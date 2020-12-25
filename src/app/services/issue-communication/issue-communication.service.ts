import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Issue } from 'src/app/models/issue/issue';

@Injectable({
  providedIn: 'root',
})
export class IssueCommunicationService {
  issueCreated = new Subject();
  issueClicked = new Subject<Issue>();

  constructor() {}

  announceIssueCreated(issue) {
    this.issueCreated.next(issue);
  }
}
