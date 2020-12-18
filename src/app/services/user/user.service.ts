import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  signupUrl = '/users/signup';
  loginUrl = '/login';

  constructor(private httpClient: HttpClient) {}

  signUp(userCredentials): Observable<HttpResponse<any>> {
    return this.httpClient.post(this.signupUrl, userCredentials, {
      observe: 'response',
    });
  }

  login(userCredentials): Observable<HttpResponse<any>> {
    return this.httpClient.post(this.loginUrl, userCredentials, {
      observe: 'response',
    });
  }
}
