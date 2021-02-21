import { HttpResponse } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  observable: Observable<HttpResponse<any>>;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {}

  onLogin() {
    if (this.loginForm.valid) {
      this.observable = this.userService.login(this.loginForm.value);
      this.subscription = this.observable.subscribe(this.handleSuccessfulLogin);
    }
  }

  handleSuccessfulLogin = (response: HttpResponse<any>) => {
    // store the token and identifier in localStorage
    this.storageService.storeUserDetails({
      identifier: response.body.id,
      token: response.headers.get('Authorization'),
    });

    // navigate to "/backlog" and replace url (disable back navigation)
    this.ngZone.run(() => {
      this.router.navigate(['/projects'], { replaceUrl: true });
    });
  };

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }
}
