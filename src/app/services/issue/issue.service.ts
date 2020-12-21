import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from '../../models/issue/issue';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  baseUrl = 'http://localhost:80/issues';

  constructor(private httpClient: HttpClient) {}

  createIssue(issue: Issue): Observable<Issue> {
    return this.httpClient.post<Issue>(this.baseUrl, issue);
  }

  getIssue(id: string): Observable<Issue> {
    return this.httpClient.get<Issue>(`${this.baseUrl}/${id}`);
  }

  getIssues(): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(this.baseUrl);
  }
}
