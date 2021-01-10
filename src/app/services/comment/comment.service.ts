import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/comment/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  baseUrl = `http://localhost:80/issues/{issueId}/comments`;

  constructor(private httpClient: HttpClient) {}

  createComment(content: string, issueId: string): Observable<Comment> {
    const url = this.baseUrl.replace('{issueId}', issueId);
    return this.httpClient.post<Comment>(url, { content });
  }

  removeComment(commentId: string, issueId: string): Observable<Comment> {
    const url = `${this.baseUrl.replace('{issueId}', issueId)}/${commentId}`;
    return this.httpClient.delete<Comment>(url);
  }

  updateComment(
    content: string,
    commentId: string,
    issueId: string
  ): Observable<Comment> {
    const url = `${this.baseUrl.replace('{issueId}', issueId)}/${commentId}`;
    return this.httpClient.patch<Comment>(url, { content });
  }
}
