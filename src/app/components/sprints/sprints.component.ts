import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import SprintStatus from 'src/app/models/enums/sprint-status';
import { SprintService } from 'src/app/services/sprint/sprint.service';

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.scss'],
})
export class SprintsComponent implements OnInit {
  projectId: string;

  constructor(
    private sprintService: SprintService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.projectId = queryParams.project;
    });
  }

  fetchActiveSprints() {
    this.sprintService
      .getSprintsByStatus(this.projectId, SprintStatus.ACTIVE)
      .subscribe({
        next: (sprints) => {
          console.log('ACTIVE SPRINTS: ' + JSON.stringify(sprints));
        },
      });
  }
}
