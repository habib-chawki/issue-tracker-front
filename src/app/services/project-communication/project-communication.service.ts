import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Project from 'src/app/models/project/project.spec';

@Injectable({
  providedIn: 'root',
})
export class ProjectCommunicationService {
  projectFormSaved$: Subject<Project>;

  constructor() {}

  announceProjectFormSaved(project: Project) {
    this.projectFormSaved$.next(project);
  }
}
