import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Board from 'src/app/models/board/board';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  baseUrl = 'http://localhost:80/boards';

  constructor(private httpClient: HttpClient) {}

  createBoard(board: Board): Observable<Board> {
    return this.httpClient.post<Board>(this.baseUrl, board);
  }

  getBoard(boardId): Observable<Board> {
    return this.httpClient.get<Board>(`${this.baseUrl}/${boardId}`);
  }
}
