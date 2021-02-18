import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Project from 'src/app/models/project/project.spec';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((response: Project[]) => {
      this.projects = response;
    });
  }

  onAddProject() {}
}
