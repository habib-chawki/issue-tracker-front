import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private sprintService: SprintService, private router: Router) {}

  ngOnInit(): void {}

  onSaveSprintBacklog() {
    // extract issues ids
    const issuesIds = this.backlog.map((issue: Issue) => +issue.id);

    this.sprintService
      .setSprintBacklog(this.sprint.project, this.sprint.id, issuesIds)
      .subscribe((response) => {
        console.log('Number of issues updated ' + response);
      });
  }

  onStartSprint = () => {
    this.router.navigate(['/board'], {
      queryParams: { sprint: this.sprint.id, project: this.sprint.project },
    });
  };
}
