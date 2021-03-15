import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import SprintStatus from 'src/app/models/enums/sprint-status';
import Sprint from 'src/app/models/sprint/sprint';
import { SprintService } from 'src/app/services/sprint/sprint.service';

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.scss'],
})
export class SprintsComponent implements OnInit {
  activeSprints: Sprint[];
  projectId: string;

  constructor(
    private sprintService: SprintService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // extract the project id query param
    this.route.queryParams.subscribe((queryParams) => {
      this.projectId = queryParams.project;

      // fetch active sprints
      this.sprintService
        .getSprintsByStatus(this.projectId, SprintStatus.ACTIVE)
        .subscribe({
          next: (sprints: Sprint[]) => {
            this.activeSprints = sprints;
            console.log(
              'ACTIVE SPRINTS: ' + JSON.stringify(this.activeSprints)
            );
          },
        });
    });
  }
}
