import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import SprintStatus from 'src/app/models/enums/sprint-status';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  queryParams = {
    backlog: {},
    activeSprints: {},
    finishedSprints: {},
    devs: {},
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (queryParams) => {
        // extract the project id query param
        const project = queryParams.project;

        // set up base query params containing project id
        const baseQueryParams = { project };

        // set up each route's query params
        this.queryParams = {
          backlog: baseQueryParams,
          activeSprints: {
            ...baseQueryParams,
            status: SprintStatus.ACTIVE,
          },
          finishedSprints: {
            ...baseQueryParams,
            status: SprintStatus.OVER,
          },
          devs: baseQueryParams,
        };
      },
    });
  }
}