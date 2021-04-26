import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-devs',
  templateUrl: './devs.component.html',
  styleUrls: ['./devs.component.scss'],
})
export class DevsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onRemoveUserFromProject(user: User) {
    // handle remove user from project event
  }
}
