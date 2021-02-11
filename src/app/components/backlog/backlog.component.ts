import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Issue } from 'src/app/models/issue/issue';
import { IssueCommunicationService } from 'src/app/services/issue-communication/issue-communication.service';
import { IssueService } from 'src/app/services/issue/issue.service';
import { IssueFormComponent } from '../issue-form/issue-form.component';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss'],
})
export class BacklogComponent implements OnInit {
  issues: Issue[] = [];
  issueDetails: Issue = {} as Issue;

  initialIssueFormValue: Issue = {} as Issue;

  constructor(
    private issueService: IssueService,
    private issueCommunicationService: IssueCommunicationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // get the list of issues
    this.issueService.getIssues().subscribe((response) => {
      this.issues = response;
    });

    // listen for issue udpate announcements
    this.issueCommunicationService.issueUpdate$.subscribe(
      this.handleIssueUpdate
    );

    // listen for issue form saved announcements
    this.issueCommunicationService.issueFormSaved$.subscribe(this.onSaveIssue);
  }

  // invoked when the form is submitted
  onSaveIssue = (issue: Issue) => {
    const found = this.issues.find((item) => item.id === issue.id);

    found ? this.updateIssue(issue) : this.createIssue(issue);
  };

  createIssue(issue: Issue) {
    // this.issueService.createIssue(issue).subscribe((createdIssue) => {
    this.issues.push(issue);
    // });
  }

  updateIssue(issue: Issue) {
    // this.issueService.updateIssue(issue).subscribe((updatedIssue) => {
    const index = this.issues.findIndex((item) => item.id === issue.id);
    this.issues[index] = issue;
    // });
  }

  // invoked when an issue update is announced
  handleIssueUpdate = (issue: Issue) => {
    this.initialIssueFormValue = issue;
    this.onDisplayIssueForm();
  };

  // invoked when the add issue button is clicked
  onDisplayIssueForm = () => {
    this.dialog.open(IssueFormComponent, { data: this.initialIssueFormValue });
  };
}
