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
  isUserLoggedIn: boolean;

  constructor(private storageService: StorageService, private router: Router) {
    this.isUserLoggedIn = this.storageService.isUserLoggedIn();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const url = route.url.toString();

    console.log('URL  ==> ' + url);

    return url === 'signup' || url == 'login'
      ? this.activateForLoggedOutUser()
      : this.activateForLoggedInUser();
  }

  activateForLoggedInUser(): boolean {
    if (this.isUserLoggedIn) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  activateForLoggedOutUser(): boolean {
    if (!this.isUserLoggedIn) {
      return true;
    }

    this.router.navigate(['/projects']);
    return false;
  }
}
