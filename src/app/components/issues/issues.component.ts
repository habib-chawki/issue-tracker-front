import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
})
export class IssuesComponent implements OnInit {
  issues = [];
  issueDetails = '';
  displayForm: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onCreateIssue(issue) {
    this.issues.push(issue);
  }

  onDisplayIssueForm() {
    this.displayForm = !this.displayForm;
  }

  onDisplayIssueDetails(issue) {
    this.issueDetails = issue.description;
  }
}
