import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/api/user/user.service';

@Component({
  selector: 'app-devs',
  templateUrl: './devs.component.html',
  styleUrls: ['./devs.component.scss'],
})
export class DevsComponent implements OnInit {
  devs: User[];
  projectId: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // extract project id and load dev team
    this.route.queryParams.subscribe({
      next: (queryParams) => {
        this.projectId = queryParams.project;
        this.loadDevs(this.projectId);
      },
    });
  }

  onRemoveDevFromProject(removedDev: User) {
    // handle remove user from project event
    this.devs = this.devs.filter((dev) => removedDev.id !== dev.id);
  }

  loadDevs(projectId) {
    // load the list of dev team members by project id
    this.userService
      .getUsersByAssignedProject(projectId)
      .pipe(take(1))
      .subscribe({
        next: (loadedDevs) => {
          this.devs = loadedDevs;
        },
      });
  }
}
