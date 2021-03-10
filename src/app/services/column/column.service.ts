import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Column from 'src/app/models/column/column';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ColumnService {
  baseUrl = `${environment.apiUrl}/boards`;

  constructor(private httpClient: HttpClient) {}

  createColumn(boardId: string, column): Observable<Column> {
    const url = `${this.baseUrl}/${boardId}/column`;

    return this.httpClient.post<Column>(url, column);
  }

  updateIssueColumn(
    boardId: string,
    columnId: string,
    issueId: string,
    newColumnId: string
  ): Observable<any> {
    const url = `${this.baseUrl}/${boardId}/columns/${columnId}/issues/${issueId}`;

    return this.httpClient.patch(url, { newColumnId: newColumnId.toString() });
  }
}
