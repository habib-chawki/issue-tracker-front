import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import SprintStatus from 'src/app/models/enums/sprint-status';
import { Issue } from 'src/app/models/issue/issue';
import Sprint from 'src/app/models/sprint/sprint';
import { SprintService } from 'src/app/services/sprint/sprint.service';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss'],
})
export class SprintComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  @Input() sprint: Sprint;

  constructor(
    private sprintService: SprintService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // extract project id
    this.route.queryParams.subscribe({
      next: (queryParams) => {
        this.sprint.projectId = queryParams.project;
      },
    });
  }

  onSaveSprintBacklog() {
    // extract issues ids
    const issuesIds = this.sprint.backlog.map((issue: Issue) => +issue.id);

    this.sprintService
      .setSprintBacklog(this.sprint.projectId, this.sprint.id, issuesIds)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        console.log('Number of issues updated ' + response);
      });
  }

  onStartSprint = () => {
    // update sprint status, set it to "Active"
    this.sprintService
      .updateSprintStatus(
        this.sprint.projectId,
        this.sprint.id,
        SprintStatus.ACTIVE
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((sprint: Sprint) => {
        console.log('SPRINT WITH UPDATED STATUS: ' + JSON.stringify(sprint));
        // navigate to the board upon successful status update
        this.router.navigate(['/board'], {
          queryParams: { project: this.sprint.projectId, sprint: sprint.id },
        });
      });
  };

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
