import { Component, OnInit } from '@angular/core';
import { Issue } from 'src/app/models/issue/issue';
import { IssueCommunicationService } from 'src/app/services/issue-communication/issue-communication.service';
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

  constructor(
    private issueService: IssueService,
    private issueCommunicationService: IssueCommunicationService
  ) {}

  ngOnInit(): void {
    this.issueService.getIssues().subscribe((response) => {
      this.issues = response;
    });

    this.issueCommunicationService.issueUpdate$.subscribe((issue: Issue) => {
      this.onUpdateIssue(issue);
    });
  }

  // invoked when the form is submitted
  onCreateIssue(issue: Issue) {
    this.issueService.createIssue(issue).subscribe((response) => {
      this.issues.push(response);
    });
  }

  onUpdateIssue(issue: Issue) {}

  // invoked when the add issue button is clicked
  onDisplayIssueForm() {
    this.willDisplayIssueForm = true;
  }

  onHideIssueForm() {
    this.willDisplayIssueForm = false;
  }
}
