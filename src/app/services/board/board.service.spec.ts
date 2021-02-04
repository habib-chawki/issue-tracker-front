import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import Board from 'src/app/models/board/board';

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

  beforeEach(() => {
    board = {
      id: '1',
      name: 'scrum_board',
      columns: [],
    };
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(boardService).toBeTruthy();
  });

  fit('should create board', () => {
    const baseUrl = 'localhost:80/boards';

    boardService.createBoard(board).subscribe((response: Board) => {
      expect(response).toBe(board);
    });

    const res = httpTestingController.expectOne(baseUrl);

    expect(res.request.url).toBe(baseUrl);
    expect(res.request.method).toBe('POST');
    expect(res.request.body).toBe(board);

    res.flush(board);
  });
});
