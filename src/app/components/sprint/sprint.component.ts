import { Component, Input, OnInit } from '@angular/core';
import Sprint from 'src/app/models/sprint/sprint';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss'],
})
export class SprintComponent implements OnInit {
  @Input() sprint: Sprint;

  constructor() {}

  ngOnInit(): void {}

  onSaveSprintBacklog() {}

  onStartSprint() {}
}
