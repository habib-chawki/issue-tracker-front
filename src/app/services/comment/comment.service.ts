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
    return this.httpClient.post<Comment>(
      this.baseUrl.replace('{issueId}', issueId),
      {
        content,
      }
    );
  }

  removeComment(commentId: string, issueId: string): Observable<Comment> {
    return this.httpClient.delete<Comment>(
      `${this.baseUrl.replace('{issueId}', issueId)}/${commentId}`
    );
  }

  updateComment(
    content: string,
    commentId: string,
    issueId: string
  ): Observable<Comment> {
    return this.httpClient.patch<Comment>(
      `${this.baseUrl.replace('{issueId}', issueId)}/${commentId}`,
      { content }
    );
  }
}
