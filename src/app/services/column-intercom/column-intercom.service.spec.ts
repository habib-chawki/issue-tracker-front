import { TestBed } from '@angular/core/testing';
import Column from 'src/app/models/column/column';

import { ColumnIntercomService } from './column-intercom.service';

describe('ColumnIntercomService', () => {
  let service: ColumnIntercomService;

  let column: Column;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColumnIntercomService);
  });

  beforeEach(() => {
    column = { id: ' 101', title: 'To do', issues: [] };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should announce column form saved', () => {
    let response: Column;

    service.columnFormSaved$.subscribe((column) => {
      response = column;
    });

    service.announceColumnFormSaved(column);

    expect(response).toBe(column);
  });
});
