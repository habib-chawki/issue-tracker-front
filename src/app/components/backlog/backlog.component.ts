import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
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
export class BacklogComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // extract the project id query param
    this.route.queryParams.subscribe((queryParams) => {
      this.projectId = queryParams.project;
    });

    // get the project backlog (list of issues)
    this.projectService
      .getBacklog(this.projectId)
      .pipe(take(1))
      .subscribe((response) => {
        this.issues = response;
      });

    // listen for issue form saved announcements
    this.issueCommunicationService.issueFormSaved$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(this.onSaveIssue);

    // listen for sprint form saved announcements
    this.sprintIntercomService.sprintFormSaved$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(this.onDisplaySprintBacklog);
  }

  onSaveIssue = (issue: Issue) => {
    // decide whether to create a new issue or update an already existing issue
    issue.id ? this.updateIssue(issue) : this.createIssue(issue);
  };

  createIssue(issue: Issue) {
    this.issueService
      .createIssue(issue, this.projectId)
      .subscribe((createdIssue: Issue) => {
        console.log('CREATED ISSUE: ' + JSON.stringify(createdIssue));
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
        // set the sprint project
        console.log('CREATED SPRINT: ' + JSON.stringify(sprint));

        this.sprint = sprint;
        this.sprint.project = this.projectId;

        this.willDisplaySprintBacklog = true;
      });
  };

  onDisplaySprintForm = () => {
    this.dialog.open(SprintFormComponent);
  };

  onDisplayActiveSprints = () => {
    // navigate to sprints component
    this.router.navigate(['/sprints'], {
      queryParams: { project: this.projectId },
    });
  };

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
