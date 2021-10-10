import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Sprint from 'src/app/models/sprint/sprint';

@Injectable({
  providedIn: 'root',
})
export class SprintSharedService {
  sprintFormSaved$ = new Subject<Sprint>();
  sprintDeleted$ = new Subject<Sprint>();

  constructor() {}

  announceSprintFormSaved(sprintForm: Sprint) {
    this.sprintFormSaved$.next(sprintForm);
  }

  announceSprintDeleted(sprintToDelete: Sprint) {
    this.sprintDeleted$.next(sprintToDelete);
  }
}
