import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.scss'],
})
export class DevComponent implements OnInit {
  @Input() dev: User;
  @Input() projectId: string;

  @Output() userRemovedFromProject = new EventEmitter<User>();

  constructor() {}

  ngOnInit(): void {}

  onRemove() {
    // emit event, announce user removed from project
    this.userRemovedFromProject.emit(this.dev);
  }
}
