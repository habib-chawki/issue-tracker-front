import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SprintFormComponent } from 'src/app/forms/sprint-form/sprint-form.component';
import { Issue } from 'src/app/models/issue/issue';
import Sprint from 'src/app/models/sprint/sprint';
import { IssueIntercomService } from 'src/app/services/issue-intercom/issue-intercom.service';
import { IssueService } from 'src/app/services/issue/issue.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { SprintIntercomService } from 'src/app/services/sprint-intercom/sprint-intercom.service';
import { SprintService } from 'src/app/services/sprint/sprint.service';
import { IssueFormComponent } from '../../forms/issue-form/issue-form.component';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss'],
})
export class BacklogComponent implements OnInit {
  sprint: Sprint;

  projectId: string;

  issues: Issue[] = [];

  willDisplaySprintBacklog: boolean = false;

  constructor(
    private issueService: IssueService,
    private projectService: ProjectService,
    private issueCommunicationService: IssueIntercomService,
    private sprintIntercomService: SprintIntercomService,
    private sprintService: SprintService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // extract the project id query param
    this.route.queryParams.subscribe((params) => {
      this.projectId = params.project;
    });

    // get the project backlog (list of issues)
    this.projectService.getBacklog(this.projectId).subscribe((response) => {
      this.issues = response;
    });

    // listen for issue form saved announcements
    this.issueCommunicationService.issueFormSaved$.subscribe(this.onSaveIssue);

    // listen for sprint form saved announcements
    this.sprintIntercomService.sprintFormSaved$.subscribe(
      this.onDisplaySprintBacklog
    );
  }

  onSaveIssue = (issue: Issue) => {
    // decide whether to create a new issue or update an already existing issue
    issue.id ? this.updateIssue(issue) : this.createIssue(issue);
  };

  createIssue(issue: Issue) {
    this.issueService
      .createIssue(issue, this.projectId)
      .subscribe((createdIssue) => {
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

  onDisplaySprintBacklog = (sprintFormValue) => {
    // create the sprint
    this.sprintService
      .createSprint(this.projectId, sprintFormValue)
      .subscribe((sprint: Sprint) => {
        this.sprint = sprint;

        this.willDisplaySprintBacklog = true;
      });
  };

  onDisplaySprintForm = () => {
    this.dialog.open(SprintFormComponent);
  };
}
