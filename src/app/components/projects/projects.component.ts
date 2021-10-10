import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ProjectFormComponent } from 'src/app/forms/project-form/project-form.component';
import Project from 'src/app/models/project/project';
import { ProjectSharedService } from 'src/app/services/shared/project/project-shared.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { StorageService } from 'src/app/services/storage/storage.service';

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
    private storageService: StorageService,
    private projectSharedService: ProjectSharedService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // given the logged-in user id
    const loggedInUserId = this.storageService.getUserIdentifier();

    // get list of projects assigned to logged-in user
    this.projectService
      .getProjectsByAssignedUser(loggedInUserId)
      .pipe(take(1))
      .subscribe((response: Project[]) => {
        this.projects = response;
      });

    // listen for project form saved announcements
    this.projectSharedService.projectFormSaved$
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
