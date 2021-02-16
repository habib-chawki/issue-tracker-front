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

    // listen for issue form saved announcements
    this.issueCommunicationService.issueFormSaved$.subscribe(this.onSaveIssue);
  }

  onSaveIssue = (issue: Issue) => {
    // decide whether to create a new issue or update an already existing issue
    issue.id ? this.updateIssue(issue) : this.createIssue(issue);
  };

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

  // invoked when the add issue button is clicked
  onDisplayIssueForm = () => {
    this.dialog.open(IssueFormComponent);
  };
}
