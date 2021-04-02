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
  users: User[] = [];

  willDisplayLoadMore = true;

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
    this.loadUsers();
  }

  onLoadMoreUsers() {
    // load the next page of users
    this.page++;
    this.loadUsers();
  }

  loadUsers() {
    this.userService
      .getPaginatedListOfUsers(this.page, this.size)
      .pipe(take(1))
      .subscribe({
        next: (response: User[]) => {
          if (response.length > 0) {
            console.log(
              'USERS LOADED: ' +
                JSON.stringify(response) +
                ' ===> PAGE: ' +
                this.page
            );
            this.users = [...this.users, ...response];
          } else {
            this.willDisplayLoadMore = false;
          }
        },
      });
  }

  onAddUserToProject(addedUser: User) {
    // when user is added successfully to a project, remove them from the list
    this.users = this.users.filter((user) => addedUser.id !== user.id);
  }
}
