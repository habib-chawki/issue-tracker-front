import { Component, OnInit } from '@angular/core';
import Project from 'src/app/models/project/project.spec';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [
    {
      id: '1',
      name: 'project 1',
    },
    {
      id: '2',
      name: 'project 2',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
