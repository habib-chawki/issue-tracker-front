import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor() {}

  createComment(
    content: string,
    issueId: string
  ): Observable<HttpResponse<any>> {
    return null;
  }
}
