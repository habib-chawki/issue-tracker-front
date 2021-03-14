import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Sprint from 'src/app/models/sprint/sprint';

@Component({
  selector: 'app-sprint-details',
  templateUrl: './sprint-details.component.html',
  styleUrls: ['./sprint-details.component.scss'],
})
export class SprintDetailsComponent implements OnInit {
  projectId: string;
  @Input() sprint: Sprint;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // extract query params
    this.route.queryParams.subscribe((queryParams) => {
      this.projectId = queryParams.project;
    });
  }

  onDisplaySprintDetails = () => {
    // navigate to board component
    this.router.navigate(['board'], {
      queryParams: { project: this.projectId, sprint: this.sprint.id },
    });
  };
}
