import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import SprintStatus from 'src/app/models/enums/sprint-status';
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
        // navigate to the board upon successful status update
        this.router.navigate(['product', 'board'], {
          queryParams: { project: this.sprint.projectId, sprint: sprint.id },
        });
      });
  };

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
