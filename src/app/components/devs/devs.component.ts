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

  onRemoveDevFromProject(removedDev: User) {
    // handle remove user from project event
    this.devs = this.devs.filter((dev) => removedDev.id !== dev.id);
  }

  loadDevs() {
    // load the list of dev team members
  }
}
