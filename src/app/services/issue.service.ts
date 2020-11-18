import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Issue } from '../models/issue';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  baseUrl = 'http://localhost:80/issues';

  constructor(private httpClient: HttpClient) {}

  getIssues() {
    return this.httpClient.get(this.baseUrl);
  }

  getIssue(id: string) {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

  createIssue(issue: Issue) {
    return this.httpClient.post(this.baseUrl, issue);
  }
}
