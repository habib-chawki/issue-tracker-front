import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StorageService } from 'src/app/services/storage/storage.service';
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
    let identifier = '';

    // extract the token and user identifier
    this.userService.signUp(this.signupForm.value).subscribe((response) => {
      token = response.headers.get('Authorization');
      identifier = response.body.email;
    });

    // store user details (identifier + token)
    this.storageService.storeUserDetails({ identifier, token });
  }

  ngOnInit(): void {}
}
