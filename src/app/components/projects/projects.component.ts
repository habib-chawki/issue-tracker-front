import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectFormComponent } from 'src/app/forms/project-form/project-form.component';
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

  onAddProject() {
    this.dialog.open(ProjectFormComponent);
  }
}
