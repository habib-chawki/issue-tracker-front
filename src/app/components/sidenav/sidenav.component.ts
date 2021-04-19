import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import SprintStatus from 'src/app/models/enums/sprint-status';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  queryParams = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (queryParams) => {
        // extract the project id query param
        const project = queryParams.project;

        // set up each route's query params
        this.queryParams = {
          activeSprints: {
            project,
            status: SprintStatus.ACTIVE,
          },
          finishedSprints: {
            project,
            status: SprintStatus.OVER,
          },
          devs: { project },
        };
      },
    });
  }
}
