import { Component, OnInit } from '@angular/core';
import { Issue } from 'src/app/models/issue';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
})
export class IssuesComponent implements OnInit {
  issues: Issue[] = [];
  issueDetails: Issue = {} as Issue;
  displayForm: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  // invoked when the form is submitted
  onCreateIssue(issue: Issue) {
    this.issues.push(issue);
  }

  // invoked when the add issue button is clicked
  onDisplayIssueForm() {
    this.displayForm = !this.displayForm;
  }

  // invoked when an issue component is clicked
  onDisplayIssueDetails(issue: Issue) {
    this.issueDetails = issue;
  }
}
