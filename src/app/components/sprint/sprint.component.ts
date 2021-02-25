import { Component, Input, OnInit } from '@angular/core';
import { Issue } from 'src/app/models/issue/issue';
import Sprint from 'src/app/models/sprint/sprint';
import { SprintService } from 'src/app/services/sprint/sprint.service';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss'],
})
export class SprintComponent implements OnInit {
  backlog: Issue[] = [];

  @Input() sprint: Sprint;

  constructor(private sprintService: SprintService) {}

  ngOnInit(): void {}

  onSaveSprintBacklog() {
    // TODO: save sprint backlog
    this.sprintService.setSprintBacklog(
      this.sprint.project,
      this.sprint.id,
      this.backlog
    );

    console.log(this.sprint);
  }

  onStartSprint() {}
}
