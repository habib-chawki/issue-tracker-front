import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Project from 'src/app/models/project/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectSharedService {
  projectFormSaved$ = new Subject<Project>();

  constructor() {}

  announceProjectFormSaved(project: Project) {
    this.projectFormSaved$.next(project);
  }
}
