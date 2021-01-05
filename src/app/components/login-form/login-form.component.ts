import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  loginForm = new FormGroup({
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

  onLogin() {
    if (this.loginForm.valid) {
      let identifier = '';
      let token = '';

      this.userService.login(this.loginForm.value).subscribe((response) => {
        token = response.headers.get('Authorization');
        identifier = response.body.id;

        // store the token and identifier in localStorage
        this.storageService.storeUserDetails({ identifier, token });
      });
    }
  }

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
