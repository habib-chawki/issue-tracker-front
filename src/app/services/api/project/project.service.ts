import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from 'src/app/models/issue/issue';
import Project from 'src/app/models/project/project';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  baseUrl = `${environment.apiUrl}/projects`;

  constructor(private httpClient: HttpClient) {}

  createProject(project): Observable<Project> {
    return this.httpClient.post<Project>(this.baseUrl, project);
  }

  getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.baseUrl);
  }

  getBacklog(projectId: string): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(`${this.baseUrl}/${projectId}/backlog`);
  }

  addUserToProject(projectId: string, userId: string) {
    const url = `${this.baseUrl}/${projectId}/users/${userId}`;

    return this.httpClient.post<void>(url, null);
  }

  getProjectsByAssignedUser(userId: string): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.baseUrl, {
      params: { user: userId },
    });
  }

  removeUserFromProject(projectId: string, userId: string) {
    const url = `${this.baseUrl}/${projectId}/users/${userId}`;

    return this.httpClient.delete<void>(url);
  }
}
