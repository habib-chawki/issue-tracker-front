import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
