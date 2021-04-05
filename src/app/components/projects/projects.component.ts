import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ProjectFormComponent } from 'src/app/forms/project-form/project-form.component';
import Project from 'src/app/models/project/project';
import { ProjectCommunicationService } from 'src/app/services/project-intercom/project-intercom.service';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  projects: Project[] = [];

  constructor(
    private projectService: ProjectService,
    private projectCommunicationService: ProjectCommunicationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.projectService
      .getProjects()
      .pipe(take(1))
      .subscribe((response: Project[]) => {
        this.projects = response;
        console.log('PROJECTS LOADED: ' + JSON.stringify(this.projects));
      });

    // listen for project form saved announcements
    this.projectCommunicationService.projectFormSaved$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(this.createProject);
  }

  createProject = (project) => {
    this.projectService
      .createProject(project)
      .pipe(take(1))
      .subscribe((createdProject: Project) => {
        this.projects.push(createdProject);
      });
  };

  onAddProject() {
    this.dialog.open(ProjectFormComponent);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
