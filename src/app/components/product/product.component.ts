import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import SprintStatus from 'src/app/models/enums/sprint-status';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  navItems: Array<{
    label: string;
    icon: string;
    link: string;
    queryParams: string;
  }>;

  queryParams = {
    backlog: {},
    activeSprints: {},
    finishedSprints: {},
    devs: {},
    users: {},
    projects: {},
  };

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService
  ) {
    this.navItems = [
      {
        label: 'Backlog',
        icon: 'description',
        link: './backlog',
        queryParams: '',
      },
      {
        label: 'Active sprints',
        icon: 'toggle_on',
        link: './sprints',
        queryParams: '',
      },
      {
        label: 'Finished sprints',
        icon: 'toggle_off',
        link: './sprints',
        queryParams: '',
      },
      { label: 'Dev team', icon: 'groups', link: './devs', queryParams: '' },
      {
        label: 'Other Devs',
        icon: 'group_add',
        link: './users',
        queryParams: '',
      },
      {
        label: 'Projects',
        icon: 'folder_special',
        link: './projects',
        queryParams: '',
      },
    ];
  }

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
          users: baseQueryParams,
          projects: {},
        };
      },
    });
  }

  onLogOut() {
    console.log('LOG OUT');
    this.storageService.removeUserDetails();
  }
}
