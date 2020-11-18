import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Issue } from '../models/issue';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  constructor(private httpClient: HttpClient) {}

  getIssues() {
    return this.httpClient.get('http://localhost:80/issues');
  }

  getIssue(id: string) {
    return this.httpClient.get(`http://localhost:80/issues/${id}`);
  }

  createIssue(issue: Issue) {
    return this.httpClient.post('http://localhost:80/issues', issue);
  }
}
