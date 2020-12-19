import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StorageService } from 'src/app/services/token/token.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private userService: UserService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {}

  onLogin() {
    let token = '';

    // extract the auth token from the response header
    this.userService.login(this.loginForm.value).subscribe((response) => {
      token = response.headers.get('Authorization');
    });

    // store the token in localStorage
    this.storageService.storeToken(token);
  }
}
