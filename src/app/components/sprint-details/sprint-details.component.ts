import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Sprint from 'src/app/models/sprint/sprint';

@Component({
  selector: 'app-sprint-details',
  templateUrl: './sprint-details.component.html',
  styleUrls: ['./sprint-details.component.scss'],
})
export class SprintDetailsComponent implements OnInit {
  @Input() sprint: Sprint;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onDisplaySprintDetails = () => {
    console.log(this.sprint);
  };
}
