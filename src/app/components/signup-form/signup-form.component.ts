import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StorageService } from 'src/app/services/token/token.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    userName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private userService: UserService,
    private storageService: StorageService
  ) {}

  onSignUp() {
    let token = '';

    // extract the token from the response's Authorization header
    this.userService.signUp(this.signupForm.value).subscribe((response) => {
      token = response.headers.get('Authorization');
    });

    // store the auth token
    this.storageService.storeToken(token);
  }

  ngOnInit(): void {}
}
