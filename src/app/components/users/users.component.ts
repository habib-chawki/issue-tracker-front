import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  projectId: string;
  users: User[];

  // pagination params
  page = 0;
  size = 10;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // extract project id query param
    this.route.queryParams.subscribe({
      next: (queryParams) => {
        this.projectId = queryParams.project;
      },
    });

    // load the first page of users
    this.userService
      .getPaginatedListOfUsers(this.page, this.size)
      .pipe(take(1))
      .subscribe({
        next: (response: User[]) => {
          console.log(
            'USERS LOADED: ' +
              JSON.stringify(response) +
              ' ===> PAGE: ' +
              this.page
          );
          this.users = response;
        },
      });
  }

  onLoadMoreUsers() {
    // load the next page of users
    this.page++;
    this.userService
      .getPaginatedListOfUsers(this.page, this.size)
      .pipe(take(1))
      .subscribe({
        next: (response: User[]) => {
          console.log(
            'USERS LOADED: ' +
              JSON.stringify(response) +
              ' ===> PAGE: ' +
              this.page
          );
          this.users = [...this.users, ...response];
        },
      });
  }
}
