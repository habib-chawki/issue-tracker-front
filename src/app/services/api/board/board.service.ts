import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Board from 'src/app/models/board/board';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  baseUrl = `${environment.apiUrl}/boards`;

  constructor(private httpClient: HttpClient) {}

  createBoard(sprintId: string, board: Board): Observable<Board> {
    return this.httpClient.post<Board>(this.baseUrl, board, {
      params: {
        sprint: sprintId,
      },
    });
  }

  getBoard(boardId): Observable<Board> {
    return this.httpClient.get<Board>(`${this.baseUrl}/${boardId}`);
  }
}
