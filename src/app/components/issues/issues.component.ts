import { Component, OnInit } from '@angular/core';
import { Issue } from 'src/app/models/issue';
import { IssueService } from 'src/app/services/issue/issue.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
})
export class IssuesComponent implements OnInit {
  issues: Issue[] = [];
  issueDetails: Issue = {} as Issue;
  displayForm: boolean = false;

  constructor(private issueService: IssueService) {}

  ngOnInit(): void {
    this.issueService.getIssues().subscribe((response) => {
      this.issues = response;
    });
  }

  // invoked when the form is submitted
  onCreateIssue(issue: Issue) {
    this.issueService.createIssue(issue).subscribe((response) => {
      this.issues.push(response);
    });
  }

  // invoked when the add issue button is clicked
  onDisplayIssueForm() {
    this.displayForm = !this.displayForm;
  }

  // invoked when an issue component is clicked
  onDisplayIssueDetails(issue: Issue) {
    this.issueDetails = issue;
  }

  // invoked when the issue remove button is clicked
  onRemoveIssue(issue: Issue) {}
}
