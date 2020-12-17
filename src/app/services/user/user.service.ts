import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = '/users/signup';

  constructor(private httpClient: HttpClient) {}

  signUp(userDetails): Observable<HttpResponse<any>> {
    return this.httpClient.post(this.baseUrl, userDetails, {
      observe: 'response',
    });
  }
}
