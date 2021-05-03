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
  sprints: Sprint[];
  backlog: Issue[] = [];

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
    this.route.queryParams.subscribe((queryParams) => {
      this.projectId = queryParams.project;

      // get the project backlog (list of issues)
      this.projectService
        .getBacklog(this.projectId)
        .pipe(take(1))
        .subscribe({
          next: (response: Issue[]) => {
            this.backlog = response;
            console.log('PRODUCT BACKLOG: ', JSON.stringify(this.backlog));
          },
        });

      // get the list of inactive sprints
      this.sprintService
        .getSprintsByStatus(this.projectId, SprintStatus.INACTIVE)
        .pipe(take(1))
        .subscribe({
          next: (response: Sprint[]) => {
            this.sprints = response;
            console.log('INACTIVE SPRINTS: ' + JSON.stringify(this.sprints));
          },
        });
    });

    // listen for issue form saved announcements
    this.issueCommunicationService.issueFormSaved$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(this.onSaveIssue);

    // listen for sprint form saved announcements
    this.sprintIntercomService.sprintFormSaved$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(this.createSprint);
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
        this.backlog.push(createdIssue);
      });
  }

  updateIssue(issue: Issue) {
    this.issueService.updateIssue(issue).subscribe((updatedIssue) => {
      const index = this.backlog.findIndex(
        (item) => item.id === updatedIssue.id
      );
      this.backlog[index] = updatedIssue;
    });
  }

  // invoked when the add issue button is clicked
  onDisplayIssueForm = () => {
    this.dialog.open(IssueFormComponent, {
      data: { projectId: this.projectId },
    });
  };

  createSprint = (sprintFormValue) => {
    this.sprintService
      .createSprint(this.projectId, sprintFormValue)
      .pipe(take(1))
      .subscribe({
        next: (createdSprint: Sprint) => {
          console.log('CREATED SPRINT: ' + JSON.stringify(createdSprint));

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
       set the sprint id to null indicating that the issue is coming from the product backlog */
      const sprintId = event.previousContainer.data.id
        ? event.previousContainer.data.id
        : null;

      /* when the sprint backlog is the new container then set the new sprint id
       otherwise set it to null indicating that the issue is back to the product backlog */
      const newSprintId = event.container.data.id
        ? event.container.data.id
        : null;

      this.sprintService
        .updateIssueSprint(projectId, sprintId, issueId, newSprintId)
        .subscribe({
          next: () => {
            console.log('UPDATED ISSUE SPRINT!');
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
