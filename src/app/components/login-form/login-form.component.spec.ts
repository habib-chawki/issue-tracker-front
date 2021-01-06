import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/user/user.service';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let nativeElement: HTMLElement;

  let userService: UserService;
  let storageService: StorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

    userService = TestBed.inject(UserService);
    storageService = TestBed.inject(StorageService);

    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render login form with email and password input fields and a submit button', () => {
    expect(nativeElement.querySelector('form')).toBeTruthy();

    expect(
      nativeElement.querySelector('form input#email[formControlName = "email"]')
    ).toBeTruthy();

    expect(
      nativeElement.querySelector(
        'form input#password[formControlName = "password"]'
      )
    ).toBeTruthy();

    expect(
      nativeElement.querySelector('form button[type = "submit"]').textContent
    ).toContain('Login');
  });

  it('should render labels for form field inputs', () => {
    expect(
      nativeElement.querySelector('label[for="email"]').textContent
    ).toContain('Email');

    expect(
      nativeElement.querySelector('label[for="password"]').textContent
    ).toContain('Password');
  });

  it('should define form group and form controls', () => {
    expect(component.loginForm.controls['email']).toBeTruthy();
    expect(component.loginForm.controls['password']).toBeTruthy();
  });

  it('should call "onLogin()" handler method when submit button is clicked', () => {
    // given the "onLogin()" handler method
    spyOn(component, 'onLogin');

    // given the login form submit button
    const submitButton: HTMLButtonElement = nativeElement.querySelector(
      'form button[type="submit"]'
    );

    // when the button is clicked
    submitButton.click();

    // then the "onLogin()" handler method should be called
    expect(component.onLogin).toHaveBeenCalled();
  });

  it('should call userService#login() with the form value, given the form is valid, when "onLogin()" is called', () => {
    component.observable = new Observable();

    spyOn(userService, 'login').and.returnValue(component.observable);
    spyOn(component.observable, 'subscribe');

    // given a valid form
    component.loginForm.setValue({
      email: 'valid@email.com',
      password: 'v@l!d-p@$$',
    });

    // when "onLogin()" is called (form is submitted)
    component.onLogin();

    // then userService#login should be invoked with login form values
    expect(userService.login).toHaveBeenCalledWith(component.loginForm.value);
  });

  it('should not call userService#login(), given the form is invalid, when "onLogin()" is called', () => {
    spyOn(userService, 'login');

    // given an invalid form
    component.loginForm.setValue({
      email: 'invalid_email.com',
      password: 'lmp',
    });

    // when "onLogin()" is called (form submitted)
    component.onLogin();

    // then userService#login should not be invoked
    expect(userService.login).not.toHaveBeenCalled();
  });

  it('should invoke "handleSuccessfulLogin()", given a valid form, when "onLogin()" is called', () => {
    // given the successful login handler
    spyOn(component, 'handleSuccessfulLogin');

    // given the login response
    const response = new HttpResponse();
    spyOn(userService, 'login').and.returnValue(of(response));

    // given a valid form
    component.loginForm.setValue({
      email: 'valid@email.com',
      password: 'v@l!d-p@$$',
    });

    // when "onLogin()" is invoked
    component.onLogin();

    // then "handleSuccessfulLogin()" should be called with the login response
    expect(component.handleSuccessfulLogin).toHaveBeenCalledWith(response);
  });

  it('should store the auth token and user identifier in "localStorage" when login is successful', () => {
    // given the "storeUserDetails()" service method
    spyOn(storageService, 'storeUserDetails');

    // given a valid form
    component.loginForm.setValue({
      email: 'valid@email.com',
      password: 'v@l!d-p@$$',
    });

    // given the user identifier and auth token
    const identifier = 'George.R.R.Martin@email.com';
    const token =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ikdlb3JnZS5SLlIuTWFydGluQGVtYWlsLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.Qx4-yL0S1D95hekkN3tLgwiFQdytsE95gp9a3QNK2sA';

    // given the login response
    const headers = new HttpHeaders({ Authorization: token });
    const body = { id: identifier };
    const response = new HttpResponse({ body, headers });

    // when the successful login handler method is invoked
    component.handleSuccessfulLogin(response);

    // then tokenService#storeUserDetails should be called with the auth token and user identifier
    expect(storageService.storeUserDetails).toHaveBeenCalledWith(
      jasmine.objectContaining({ identifier, token })
    );
  });

  it('should unsubscribe when the component is destroyed', () => {
    component.subscription = new Subscription();
    spyOn(component.subscription, 'unsubscribe');

    // when ngOnDestroy() is called (component is destroyed)
    component.ngOnDestroy();

    // then expect to unsubscribe from all subscriptions
    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });

  it('should validate email', () => {
    const invalidEmail = 'this-email-is-invalid';
    const validEmail = 'this-email-is-valid@email.com';

    // should invalidate email
    component.email.setValue(invalidEmail);
    expect(component.email.valid).toBeFalse();

    // should validate email
    component.email.setValue(validEmail);
    expect(component.email.valid).toBeTrue();
  });

  it('should validate password', () => {
    const invalidTooShortPassword = 'lmp';
    const validPassword = 'L%$5sde';

    // should invalidate password
    component.password.setValue(invalidTooShortPassword);
    expect(component.password.valid).toBeFalse();

    // should validate password
    component.password.setValue(validPassword);
    expect(component.password.valid).toBeTrue();
  });

  it('should not display error message when email is valid', () => {
    // given the email input field
    const emailField = fixture.debugElement.nativeElement.querySelector(
      'input#email'
    );

    // when a valid email is inputted and the input field is touched
    emailField.value = 'valid@email.com';

    emailField.dispatchEvent(new Event('input'));
    emailField.dispatchEvent(new Event('blur'));

    fixture.detectChanges();

    // then the error message should not be dispalyed
    expect(nativeElement.querySelector('div#email-error')).toBeFalsy();
  });

  it('should display invalid email error message when email is not valid', () => {
    // error message should not be displayed at first
    expect(nativeElement.querySelector('div#email-error')).toBeFalsy();

    // given the email input field
    const emailField = fixture.debugElement.nativeElement.querySelector(
      'input#email'
    );

    // when an invalid email is inputted and the input field is touched
    emailField.value = 'invalid$email.com';

    emailField.dispatchEvent(new Event('input'));
    emailField.dispatchEvent(new Event('blur'));

    fixture.detectChanges();

    // then the error message should be displayed
    expect(
      nativeElement.querySelector('div#email-error').textContent
    ).toContain('Invalid email');
  });

  it('should not display error message when password is valid', () => {
    // given the password input field
    const passwordField = fixture.debugElement.nativeElement.querySelector(
      'input#password'
    );

    // when a valid password is inputted and the password field is blurred
    passwordField.value = 'v@l!d_pa$$';

    passwordField.dispatchEvent(new Event('input'));
    passwordField.dispatchEvent(new Event('blur'));

    fixture.detectChanges();

    // then the error message should not be displayed
    expect(nativeElement.querySelector('div#password-error')).toBeFalsy();
  });

  it('should display error message when the password is invalid', () => {
    // error message should not be displayed at first
    expect(nativeElement.querySelector('div#password-error')).toBeFalsy();

    // given the password input field
    const passwordField = fixture.debugElement.nativeElement.querySelector(
      'input#password'
    );

    // when an invalid password is inputted and the password field is blurred
    passwordField.value = 'pas';

    passwordField.dispatchEvent(new Event('input'));
    passwordField.dispatchEvent(new Event('blur'));

    fixture.detectChanges();

    // then the error message should be displayed
    expect(
      nativeElement.querySelector('div#password-error').textContent
    ).toContain('Invalid password');
  });
});
