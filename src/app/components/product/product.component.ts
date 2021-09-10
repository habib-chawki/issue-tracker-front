import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    queryParams: {};
  }>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (queryParams) => {
        // extract the project id query param
        const project = queryParams.project;

        // init nav items, populate query params
        this.navItems = [
          {
            label: 'Backlog',
            icon: 'description',
            link: 'backlog',
            queryParams: { project },
          },
          {
            label: 'Active sprints',
            icon: 'toggle_on',
            link: 'sprints',
            queryParams: { project, status: SprintStatus.ACTIVE },
          },
          {
            label: 'Finished sprints',
            icon: 'toggle_off',
            link: 'sprints',
            queryParams: { project, status: SprintStatus.OVER },
          },
          {
            label: 'Dev team',
            icon: 'groups',
            link: 'devs',
            queryParams: { project },
          },
          {
            label: 'Other Devs',
            icon: 'group_add',
            link: 'users',
            queryParams: { project },
          },
          {
            label: 'Projects',
            icon: 'folder_special',
            link: 'projects',
            queryParams: { project },
          },
        ];
      },
    });
  }

  onNavigate(navListItem) {
    this.router.navigate([navListItem.link], {
      queryParams: navListItem.queryParams,
      relativeTo: this.route,
    });
  }

  onLogOut() {
    this.storageService.removeUserDetails();
    this.router.navigateByUrl('/login');
  }
}
