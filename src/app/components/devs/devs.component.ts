import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-devs',
  templateUrl: './devs.component.html',
  styleUrls: ['./devs.component.scss'],
})
export class DevsComponent implements OnInit {
  projectId: string;
  devs: User[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (queryParams) => {
        this.projectId = queryParams.project;
      },
    });
  }

  onRemoveUserFromProject(user: User) {
    // handle remove user from project event
  }

  loadDevs() {
    // load the list of dev team members
  }
}
