import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = '/users';

  constructor(private httpClient: HttpClient) {}

  signUp(userCredentials): Observable<HttpResponse<any>> {
    const url = `${environment.apiUrl}/${this.baseUrl}/signup`;

    return this.httpClient.post(url, userCredentials, { observe: 'response' });
  }

  login(userCredentials): Observable<HttpResponse<any>> {
    const url = `${environment.apiUrl}/login`;
    return this.httpClient.post(url, userCredentials, { observe: 'response' });
  }
}
