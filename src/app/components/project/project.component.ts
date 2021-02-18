import { Component, Input, OnInit } from '@angular/core';
import Project from 'src/app/models/project/project.spec';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  @Input() project: Project;

  constructor() {}

  ngOnInit(): void {}
}
