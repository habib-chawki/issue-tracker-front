import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  signupUrl = 'users/signup';
  loginUrl = 'login';

  constructor(private httpClient: HttpClient) {}

  signUp(userCredentials): Observable<HttpResponse<any>> {
    const url = `${environment.apiUrl}/${this.signupUrl}`;

    return this.httpClient.post(url, userCredentials, { observe: 'response' });
  }

  login(userCredentials): Observable<HttpResponse<any>> {
    const url = `${environment.apiUrl}/${this.loginUrl}`;
    return this.httpClient.post(url, userCredentials, { observe: 'response' });
  }
}
