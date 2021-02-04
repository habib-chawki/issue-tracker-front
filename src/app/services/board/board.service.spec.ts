import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { BoardService } from './board.service';

describe('BoardService', () => {
  let boardService: BoardService;
  let httpTestingController: HttpTestingController;

  let board: Board;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });

    boardService = TestBed.inject(BoardService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {});

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(boardService).toBeTruthy();
  });

  it('should create board', () => {
    boardService.createBoard().subscribe((board: Board) => {});
  });
});
