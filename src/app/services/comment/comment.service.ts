import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/comment/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  baseUrl = `/issues/{issueId}/comments`;

  constructor(private httpClient: HttpClient) {}

  createComment(content: string, issueId: string): Observable<Comment> {
    return this.httpClient.post<Comment>(
      this.baseUrl.replace('{issueId}', issueId),
      {
        content,
      }
    );
  }
}
