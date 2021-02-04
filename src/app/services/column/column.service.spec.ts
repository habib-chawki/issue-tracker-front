import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import Column from 'src/app/models/column/column';

import { ColumnService } from './column.service';

describe('ColumnService', () => {
  let columnService: ColumnService;
  let httpTestingController: HttpTestingController;

  const boardId = '100';
  const baseUrl = `http://localhost:80/boards/${boardId}/columns`;

  let column: Column;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });

    columnService = TestBed.inject(ColumnService);
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
    expect(columnService).toBeTruthy();
  });

  it('should create column', () => {
    columnService.createColumn(column, boardId).subscribe((response) => {
      expect(response).toBe(column);
    });

    const req = httpTestingController.expectOne(baseUrl);

    expect(req.request.url).toBe(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(column);

    req.flush(column);
  });
});
