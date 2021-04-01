import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[];
  page = 0;
  size = 10;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // load the first page of users
    this.userService
      .getPaginatedListOfUsers(this.page, this.size)
      .pipe(take(1))
      .subscribe({
        next: (response: User[]) => {
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
          this.users = [...this.users, ...response];
        },
      });
  }
}
