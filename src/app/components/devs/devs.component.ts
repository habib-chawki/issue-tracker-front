import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-devs',
  templateUrl: './devs.component.html',
  styleUrls: ['./devs.component.scss'],
})
export class DevsComponent implements OnInit {
  projectId: string;
  devs: User[];

  // pagination params
  page = 0;
  size = 10;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // extract project id and load dev team
    this.route.queryParams.subscribe({
      next: (queryParams) => {
        this.projectId = queryParams.project;

        this.loadDevs();
      },
    });
  }

  onRemoveDevFromProject(removedDev: User) {
    // handle remove user from project event
    this.devs = this.devs.filter((dev) => removedDev.id !== dev.id);
  }

  loadDevs() {
    // load the list of dev team members
    this.userService
      .getUsersByAssignedProject(this.projectId, this.page, this.size)
      .pipe(take(1))
      .subscribe({
        next: (loadedDevs) => {
          this.devs = loadedDevs;
          console.log('DEV TEAM LOADED: ' + JSON.stringify(loadedDevs));
        },
      });
  }
}
