import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import SprintStatus from 'src/app/models/enums/sprint-status';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  queryParams = {
    activeSprints: {},
    finishedSprints: {},
    devs: {},
  };

  projectId: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // extract the project id query param
    this.route.queryParams.subscribe({
      next: (queryParams) => {
        this.projectId = queryParams.project;

        this.queryParams = {
          activeSprints: {
            project: this.projectId,
            status: SprintStatus.ACTIVE,
          },
          finishedSprints: {
            project: this.projectId,
            status: SprintStatus.OVER,
          },
          devs: { project: this.projectId },
        };
      },
    });
  }

  onDisplayActiveSprints = () => {
    // navigate to sprints component
    this.router.navigate(['/product/sprints'], {
      queryParams: { project: this.projectId, status: SprintStatus.ACTIVE },
    });
  };

  onDisplayFinishedSprints = () => {
    // navigate to sprints component
    this.router.navigate(['/product/sprints'], {
      queryParams: { project: this.projectId, status: SprintStatus.OVER },
    });
  };

  onDisplayDevs = () => {
    // navigate to users component
    this.router.navigate(['/product/devs'], {
      queryParams: { project: this.projectId },
    });
  };
}
