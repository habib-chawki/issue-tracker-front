import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommentBuilder } from 'src/app/models/comment-builder/comment-builder';
import IssuePriority from 'src/app/models/enums/issue-priority';
import IssueResolution from 'src/app/models/enums/issue-resolution';
import IssueStatus from 'src/app/models/enums/issue-status';
import IssueType from 'src/app/models/enums/issue-type';
import { Issue } from 'src/app/models/issue/issue';
import { UserBuilder } from 'src/app/models/user-builder/user-builder';
import { IssueCommunicationService } from 'src/app/services/issue-communication/issue-communication.service';
import { IssueService } from 'src/app/services/issue/issue.service';
import { IssueFormComponent } from '../issue-form/issue-form.component';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss'],
})
export class BacklogComponent implements OnInit {
  issues: Issue[] = [
    {
      id: '1',
      key: 'Dh85m',
      description: 'Issue description',
      summary: 'Issue summary',
      priority: IssuePriority.medium,
      type: IssueType.Bug,
      status: IssueStatus.InProgress,
      resolution: IssueResolution.Duplicate,
      assignee: new UserBuilder().username('Me').build(),
      reporter: new UserBuilder().username('Someone').build(),
      comments: [
        new CommentBuilder().content('comment1').owner('jon doe').build(),
        new CommentBuilder().content('comment2').owner('jane doe').build(),
      ],
      votes: 8,
      watchers: ['jon', 'jane'],
      creationTime: new Date(),
      updateTime: new Date(),
      estimate: new Date(),
    },
    {
      id: '2',
      key: 'Rt9xP',
      description: 'Issue 2 description',
      summary: 'Issue 2 summary',
      priority: IssuePriority.low,
      type: IssueType.Story,
      status: IssueStatus.Todo,
      resolution: IssueResolution.Unresolved,
      assignee: new UserBuilder().username('You').build(),
      reporter: new UserBuilder().username('Someone else').build(),
      comments: [
        new CommentBuilder().content('comment1').owner('jon doe').build(),
        new CommentBuilder().content('comment2').owner('jane doe').build(),
        new CommentBuilder().content('comment3').owner('joe doe').build(),
      ],
      votes: 2,
      watchers: [],
      creationTime: new Date(),
      updateTime: new Date(),
      estimate: new Date(),
    },
  ];
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
    const found = this.issues.find((item) => {
      item.id === issue.id;
    });

    found ? this.updateIssue(issue) : this.createIssue(issue);
  };

  createIssue(issue: Issue) {
    // this.issueService.createIssue(issue).subscribe((createdIssue) => {
    issue.id = Math.floor(Math.random() * 1000).toString();
    this.issues.push(issue);
    // });
  }

  updateIssue(issue: Issue) {
    // this.issueService.updateIssue(issue).subscribe((updatedIssue) => {
    const index = this.issues.findIndex((item) => item.id === issue.id);
    this.issues[index] = issue;
    // });
  }

  // invoked when the add issue button is clicked
  onDisplayIssueForm = () => {
    this.dialog.open(IssueFormComponent);
  };
}
