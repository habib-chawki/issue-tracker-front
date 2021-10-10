import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { SprintFormComponent } from 'src/app/forms/sprint-form/sprint-form.component';
import SprintStatus from 'src/app/models/enums/sprint-status';
import { Issue } from 'src/app/models/issue/issue';
import Sprint from 'src/app/models/sprint/sprint';
import { IssueSharedService } from 'src/app/services/issue-intercom/issue-intercom.service';
import { IssueService } from 'src/app/services/issue/issue.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { SprintSharedService } from 'src/app/services/sprint-intercom/sprint-intercom.service';
import { SprintService } from 'src/app/services/sprint/sprint.service';
import { IssueFormComponent } from '../../forms/issue-form/issue-form.component';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss'],
})
export class BacklogComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  projectId: string;
  sprints: Sprint[];
  backlog: Issue[] = [];

  constructor(
    private issueService: IssueService,
    private projectService: ProjectService,
    private issueSharedService: IssueSharedService,
    private sprintSharedService: SprintSharedService,
    private sprintService: SprintService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // extract the project id query param
    this.route.queryParams.subscribe((queryParams) => {
      this.projectId = queryParams.project;

      // get the project backlog (list of issues)
      this.projectService
        .getBacklog(this.projectId)
        .pipe(take(1))
        .subscribe({
          next: (response: Issue[]) => {
            this.backlog = response;
          },
        });

      // get the list of inactive sprints
      this.sprintService
        .getSprintsByStatus(this.projectId, SprintStatus.INACTIVE)
        .pipe(take(1))
        .subscribe({
          next: (response: Sprint[]) => {
            this.sprints = response;
          },
        });
    });

    // listen for issue form saved announcements
    this.issueSharedService.issueFormSaved$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({ next: this.onSaveIssue });

    // listen for sprint form saved announcements
    this.sprintSharedService.sprintFormSaved$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({ next: this.createSprint });
  }

  onSaveIssue = (issue: Issue) => {
    // decide whether to create a new issue or update an already existing issue
    issue.id ? this.updateIssue(issue) : this.createIssue(issue);
  };

  createIssue(issue: Issue) {
    this.issueService
      .createIssue(issue, this.projectId)
      .pipe(take(1))
      .subscribe((createdIssue: Issue) => {
        this.backlog.push(createdIssue);
      });
  }

  onRemoveSprint(sprintToDelete: Sprint) {
    // remove sprint backlog
    this.sprints = this.sprints.filter(
      (sprint) => sprint.id !== sprintToDelete.id
    );

    // move sprint issues back to the product backlog
    this.backlog = [...sprintToDelete.backlog, ...this.backlog];
  }

  updateIssue(issue: Issue) {
    this.issueService
      .updateIssue(issue)
      .pipe(take(1))
      .subscribe(() => {
        const index = this.backlog.findIndex((item) => item.id === issue.id);
        this.backlog[index] = issue;
      });
  }

  // invoked when the add issue button is clicked
  onDisplayIssueForm = () => {
    this.dialog.open(IssueFormComponent);
  };

  createSprint = (sprintFormValue) => {
    this.sprintService
      .createSprint(this.projectId, sprintFormValue)
      .pipe(take(1))
      .subscribe({
        next: (createdSprint: Sprint) => {
          // add createdSprint to the list of sprints
          this.sprints.push(createdSprint);
        },
      });
  };

  onDisplaySprintForm = () => {
    this.dialog.open(SprintFormComponent);
  };

  onDrop(event: CdkDragDrop<any>) {
    // extract the data container (distinguish between sprint backlog and product backlog)
    const containerData = event.container.data.backlog
      ? event.container.data.backlog
      : event.container.data;

    const previousContainerData = event.previousContainer.data.backlog
      ? event.previousContainer.data.backlog
      : event.previousContainer.data;

    if (event.previousContainer === event.container) {
      moveItemInArray(containerData, event.previousIndex, event.currentIndex);
    } else {
      // update the issue sprint
      const projectId = this.projectId;
      const issueId = event.item.data.id;

      /* when the previous container is not a sprint backlog then 
       set the old sprint id to null indicating that the issue is coming from the product backlog */
      const oldSprintId = event.previousContainer.data.id
        ? event.previousContainer.data.id
        : null;

      /* when the sprint backlog is the new container, then set the new sprint id.
       Otherwise, set it to null indicating that the issue is to be put back in the product backlog */
      const newSprintId = event.container.data.id
        ? event.container.data.id
        : null;

      this.sprintService
        .updateIssueSprint(projectId, oldSprintId, issueId, newSprintId)
        .subscribe({
          next: () => {
            transferArrayItem(
              previousContainerData,
              containerData,
              event.previousIndex,
              event.currentIndex
            );
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
