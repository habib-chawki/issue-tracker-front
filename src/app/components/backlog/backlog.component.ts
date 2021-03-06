import { Component, OnInit } from '@angular/core';
import { Issue } from 'src/app/models/issue/issue';
import { IssueCommunicationService } from 'src/app/services/issue-communication/issue-communication.service';
import { IssueService } from 'src/app/services/issue/issue.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss'],
})
export class BacklogComponent implements OnInit {
  issues: Issue[] = [];
  issueDetails: Issue = {} as Issue;

  formValue: Issue;

  willDisplayIssueForm: boolean = false;

  constructor(
    private issueService: IssueService,
    private issueCommunicationService: IssueCommunicationService
  ) {}

  ngOnInit(): void {
    // get the list of issues
    this.issueService.getIssues().subscribe((response) => {
      this.issues = response;
    });

    // listen for issue udpate announcements
    this.issueCommunicationService.issueUpdate$.subscribe((issue: Issue) =>
      this.handleIssueUpdate(issue)
    );
  }

  // invoked when the form is submitted
  onSaveIssue(issue: Issue) {
    const found = this.issues.find((item) => item.id === issue.id);

    found ? this.updateIssue(issue) : this.createIssue(issue);
  }

  createIssue(issue: Issue) {
    this.issueService.createIssue(issue).subscribe((createdIssue) => {
      this.issues.push(createdIssue);
    });
  }

  updateIssue(issue: Issue) {
    this.issueService.updateIssue(issue).subscribe((updatedIssue) => {
      const index = this.issues.findIndex(
        (item) => item.id === updatedIssue.id
      );
      this.issues[index] = updatedIssue;
    });
  }

  // invoked when an issue update is announced
  handleIssueUpdate(issue: Issue) {
    this.formValue = issue;
    this.onDisplayIssueForm();
  }

  // invoked when the add issue button is clicked
  onDisplayIssueForm() {
    this.willDisplayIssueForm = true;
  }

  // invoked when the cancel button of the issue form is clicked
  onHideIssueForm() {
    this.willDisplayIssueForm = false;
  }
}
