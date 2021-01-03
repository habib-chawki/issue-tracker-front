import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl(''),
  });

  constructor(
    private userService: UserService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {}

  onLogin() {
    let identifier = '';
    let token = '';

    // extract the auth token and user identifier
    this.userService.login(this.loginForm.value).subscribe((response) => {
      token = response.headers.get('Authorization');
      identifier = response.body.id;
    });

    // store the token and identifier in localStorage
    this.storageService.storeUserDetails({ identifier, token });
  }
}
