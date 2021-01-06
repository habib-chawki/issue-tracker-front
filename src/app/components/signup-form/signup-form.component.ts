import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  observable: Observable<HttpResponse<any>>;

  signupForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    userName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  constructor(
    private userService: UserService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {}

  onSignUp() {
    if (this.signupForm.valid) {
      let token = '';
      let identifier = '';

      this.observable = this.userService.signUp(this.signupForm.value);

      this.subscription = this.observable.subscribe((response) => {
        token = response.headers.get('Authorization');
        identifier = response.body.id;

        // store user details (identifier + token)
        this.storageService.storeUserDetails({ identifier, token });
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  get email() {
    return this.signupForm.controls.email;
  }

  get password() {
    return this.signupForm.controls.password;
  }
}
