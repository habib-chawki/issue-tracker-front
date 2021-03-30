import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @Input() user: User;
  @Input() projectId: string;

  constructor() {}

  ngOnInit(): void {}

  onInvite() {
    // TODO: add user to project
  }
}
