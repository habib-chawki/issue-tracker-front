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

  createIssue(issue: Issue, projectId: string): Observable<Issue> {
    return this.httpClient.post<Issue>(this.baseUrl, issue, {
      params: {
        project: projectId,
      },
    });
  }

  updateIssue(issue: Issue): Observable<Issue> {
    return this.httpClient.put<Issue>(`${this.baseUrl}/${issue.id}`, issue);
  }

  getIssue(issueId: string): Observable<Issue> {
    return this.httpClient.get<Issue>(`${this.baseUrl}/${issueId}`);
  }

  getIssues(): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(this.baseUrl);
  }

  deleteIssue(issueId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${issueId}`);
  }

  updateIssueAssignee(issueId: string, assigneeId: string): Observable<Issue> {
    const url = `${this.baseUrl}/${issueId}`;
    return this.httpClient.patch<Issue>(url, { assignee: assigneeId });
  }
}
