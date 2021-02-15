import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // exlude signup and login routes
    if (request.url.endsWith('signup') || request.url.endsWith('login'))
      return next.handle(request);
    // add the Authorization token header
    const authRequest = request.clone({
      setHeaders: {
        Authorization:
          this.storageService.TOKEN_PREFIX + this.storageService.getToken(),
      },
    });

    return next.handle(authRequest);
  }
}
