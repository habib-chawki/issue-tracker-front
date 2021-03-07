import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Column from 'src/app/models/column/column';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ColumnService {
  baseUrl = `${environment.apiUrl}/boards/boardId/column`;

  constructor(private httpClient: HttpClient) {}

  createColumn(boardId: string, column): Observable<Column> {
    return this.httpClient.post<Column>(
      this.baseUrl.replace('boardId', boardId),
      column
    );
  }
}
