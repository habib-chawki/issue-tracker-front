import { HttpResponse } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ErrorService } from 'src/app/services/error/error.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit, OnDestroy {
  willHidePassword = true;

  subscription: Subscription;
  observable: Observable<HttpResponse<any>>;

  signupForm: FormGroup = new FormGroup({
    fullName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
      Validators.minLength(3),
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
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
    private ngZone: NgZone,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {}

  onSignup() {
    if (this.signupForm.valid) {
      this.observable = this.userService.signUp(this.signupForm.value);
      this.subscription = this.observable.subscribe({
        next: this.handleSuccessfulSignup,
        error: this.errorService.handleHttpError,
      });
    }
  }

  handleSuccessfulSignup = (response: HttpResponse<any>) => {
    // store user details (identifier + token)
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
    return this.signupForm.controls.email;
  }

  get password() {
    return this.signupForm.controls.password;
  }

  get fullName() {
    return this.signupForm.controls.fullName;
  }

  get userName() {
    return this.signupForm.controls.userName;
  }
}
