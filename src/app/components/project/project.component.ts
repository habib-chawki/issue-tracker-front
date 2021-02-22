import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Project from 'src/app/models/project/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  @Input() project: Project;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onClick() {
    this.router.navigate(['backlog'], {
      queryParams: { project: this.project.id },
    });
  }
}
