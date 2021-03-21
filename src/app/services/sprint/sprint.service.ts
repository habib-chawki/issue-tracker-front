import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Sprint from 'src/app/models/sprint/sprint';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SprintService {
  baseUrl = `${environment.apiUrl}/projects`;

  constructor(private httpClient: HttpClient) {}

  createSprint(projectId, sprint): Observable<Sprint> {
    const url = `${this.baseUrl}/${projectId}/sprints`;
    return this.httpClient.post<Sprint>(url, sprint);
  }

  setSprintBacklog(
    projectId: string,
    sprintId: string,
    issuesIds: number[]
  ): Observable<number> {
    const url = `${this.baseUrl}/${projectId}/sprints/${sprintId}/backlog`;
    return this.httpClient.patch<number>(url, issuesIds);
  }

  getSprint(projectId: string, sprintId: string): Observable<Sprint> {
    const url = `${this.baseUrl}/${projectId}/sprints/${sprintId}`;
    return this.httpClient.get<Sprint>(url);
  }

  updateSprintStatus(
    projectId: string,
    sprintId: string,
    status: string
  ): Observable<Sprint> {
    const url = `${this.baseUrl}/${projectId}/sprints/${sprintId}`;
    const requestBody = { newSprintStatus: status };

    return this.httpClient.patch<Sprint>(url, requestBody);
  }

  getSprintsByStatus(projectId: string, status: string): Observable<Sprint[]> {
    const url = `${this.baseUrl}/${projectId}/sprints?status=${status}`;

    return this.httpClient.get<Sprint[]>(url);
  }

  updateIssueSprint(
    projectId: string,
    sprintId: string,
    issueId: string,
    newSprintId: string
  ) {
    const url = `${this.baseUrl}/${projectId}/sprints/${sprintId}/issues/${issueId}`;
    const body = { newSprintId: newSprintId ? newSprintId.toString() : 'null' };

    return this.httpClient.patch(url, body);
  }
}
