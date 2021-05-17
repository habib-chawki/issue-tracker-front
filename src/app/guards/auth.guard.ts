import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isUserLoggedIn = this.storageService.isUserLoggedIn();

    const url = route.url.toString();

    return url === 'signup' || url == 'login'
      ? this.activateForLoggedOutUser(isUserLoggedIn)
      : this.activateForLoggedInUser(isUserLoggedIn);
  }

  activateForLoggedInUser(isUserLoggedIn): boolean {
    if (isUserLoggedIn) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  activateForLoggedOutUser(isUserLoggedIn): boolean {
    if (!isUserLoggedIn) {
      return true;
    }

    this.router.navigate(['/projects']);
    return false;
  }
}
