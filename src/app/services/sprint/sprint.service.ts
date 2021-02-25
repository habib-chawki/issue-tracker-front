import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from 'src/app/models/issue/issue';
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

  setSprintBacklog(projectId: string, sprintId: string, issues: Issue[]) {
    const url = `${this.baseUrl}/${projectId}/sprints/${sprintId}/issues`;
    this.httpClient.post(url, issues);
  }
}
