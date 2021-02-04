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

  const baseUrl = 'http://localhost:80/boards';

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

  it('should create board', () => {
    boardService.createBoard(board).subscribe((response: Board) => {
      expect(response).toBe(board);
    });

    const req = httpTestingController.expectOne(baseUrl);

    expect(req.request.url).toBe(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(board);

    req.flush(board);
  });

  fit('should get board by id', () => {
    const url = `${baseUrl}/${board.id}`;

    boardService.getBoard(board.id).subscribe((response: Board) => {
      expect(response).toBe(board);
    });

    const req = httpTestingController.expectOne(url);

    req.flush(board);
  });
});
