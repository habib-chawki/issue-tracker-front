import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Column from 'src/app/models/column/column';

@Injectable({
  providedIn: 'root',
})
export class ColumnIntercomService {
  columnFormSaved$ = new Subject<Column>();

  constructor() {}

  announceColumnFormSaved(column: Column) {
    this.columnFormSaved$.next(column);
  }
}
