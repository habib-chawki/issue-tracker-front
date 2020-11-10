import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
})
export class IssuesComponent implements OnInit {
  issues: object[] = [];

  constructor() {}

  ngOnInit(): void {}

  onCreateIssue(issue) {
    this.issues.push(issue);
  }

  onDisplayIssueDetails() {}
}
