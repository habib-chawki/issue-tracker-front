import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import Sprint from 'src/app/models/sprint/sprint';
import { SprintService } from 'src/app/services/sprint/sprint.service';

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.scss'],
})
export class SprintsComponent implements OnInit {
  sprints: Sprint[];
  projectId: string;

  constructor(
    private sprintService: SprintService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // extract the project id and sprint status query params
    this.route.queryParams.subscribe((queryParams) => {
      this.projectId = queryParams.project;
      const status = queryParams.status;

      // fetch sprints by status
      this.sprintService
        .getSprintsByStatus(this.projectId, status)
        .pipe(take(1))
        .subscribe({
          next: (sprints: Sprint[]) => {
            this.sprints = sprints;
            console.log('SPRINTS: ' + JSON.stringify(this.sprints));
          },
        });
    });
  }
}
