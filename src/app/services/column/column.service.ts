import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Column from 'src/app/models/column/column';

@Injectable({
  providedIn: 'root',
})
export class ColumnService {
  baseUrl = `http://localhost:80/boards/boardId/columns`;

  constructor(private httpClient: HttpClient) {}

  createColumn(column, boardId: string): Observable<Column> {
    return this.httpClient.post<Column>(
      this.baseUrl.replace('boardId', boardId),
      column
    );
  }
}
