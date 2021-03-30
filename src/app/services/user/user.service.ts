import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = `${environment.apiUrl}/users`;

  constructor(private httpClient: HttpClient) {}

  signUp(userCredentials): Observable<HttpResponse<any>> {
    const url = `/signup`;

    return this.httpClient.post(url, userCredentials, { observe: 'response' });
  }

  login(userCredentials): Observable<HttpResponse<any>> {
    const url = `${environment.apiUrl}/login`;
    return this.httpClient.post(url, userCredentials, { observe: 'response' });
  }

  getPaginatedListOfUsers(page, size): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl, {
      params: { page, size },
    });
  }
}
