import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Issue } from '../../models/issue/issue';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  baseUrl = `${environment.apiUrl}/issues`;

  constructor(private httpClient: HttpClient) {}

  createIssue(issue: Issue): Observable<Issue> {
    return this.httpClient.post<Issue>(this.baseUrl, issue);
  }

  updateIssue(issue: Issue): Observable<Issue> {
    return this.httpClient.put<Issue>(`${this.baseUrl}/${issue.id}`, issue);
  }

  getIssue(id: string): Observable<Issue> {
    return this.httpClient.get<Issue>(`${this.baseUrl}/${id}`);
  }

  getIssues(): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(this.baseUrl);
  }

  deleteIssue(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
