import { Component, OnInit } from '@angular/core';
import { Issue } from 'src/app/models/issue/issue';
import { IssueService } from 'src/app/services/issue/issue.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss'],
})
export class Backlog implements OnInit {
  issues: Issue[] = [];
  issueDetails: Issue = {} as Issue;

  willDisplayIssueForm: boolean = false;

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
    this.willDisplayIssueForm = true;
  }

  onHideIssueForm() {
    this.willDisplayIssueForm = false;
  }
}
