import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import Column from 'src/app/models/column/column';

import { ColumnService } from './column.service';

describe('ColumnService', () => {
  let service: ColumnService;
  let httpTestingController: HttpTestingController;

  const boardId = '100';
  const baseUrl = `http://localhost:80/boards/${boardId}/columns`;

  let column: Column;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });

    service = TestBed.inject(ColumnService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    column = {
      id: '10',
      title: 'To do',
    };
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create column', () => {});
});
