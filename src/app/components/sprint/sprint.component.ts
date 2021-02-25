import { Component, Input, OnInit } from '@angular/core';
import { Issue } from 'src/app/models/issue/issue';
import Sprint from 'src/app/models/sprint/sprint';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss'],
})
export class SprintComponent implements OnInit {
  backlog: Issue[] = [];

  @Input() sprint: Sprint;

  constructor() {}

  ngOnInit(): void {}

  onSaveSprintBacklog() {
    console.log(this.backlog);
  }

  onStartSprint() {}
}
