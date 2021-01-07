import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { observable, Observable, of, Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/user/user.service';

import { SignupFormComponent } from './signup-form.component';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;
  let nativeElement: HTMLElement;

  let userService: UserService;
  let storageService: StorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupFormComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFormComponent);
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

  it('should render signup form', () => {
    // form should be renderd
    expect(nativeElement.querySelector('form')).toBeTruthy();

    expect(
      nativeElement.querySelector(
        'input#first-name[formControlName="firstName"]'
      )
    ).toBeTruthy();

    expect(
      nativeElement.querySelector('input#last-name[formControlName="lastName"]')
    ).toBeTruthy();

    expect(
      nativeElement.querySelector('input#username[formControlName="userName"]')
    ).toBeTruthy();

    expect(
      nativeElement.querySelector('input#email[formControlName="email"]')
    ).toBeTruthy();

    expect(
      nativeElement.querySelector('input#password[formControlName="password"]')
    ).toBeTruthy();

    // submit button
    expect(
      nativeElement.querySelector('button[type="submit"]').innerHTML
    ).toContain('Sign up');
  });

  it('should render labels for form inputs', () => {
    expect(
      nativeElement.querySelector('label[for="first-name"]').textContent
    ).toContain('First name');
    expect(
      nativeElement.querySelector('label[for="last-name"]').textContent
    ).toContain('Last name');
    expect(
      nativeElement.querySelector('label[for="username"]').textContent
    ).toContain('Username');
    expect(
      nativeElement.querySelector('label[for="email"]').textContent
    ).toContain('Email');
    expect(
      nativeElement.querySelector('label[for="password"]').textContent
    ).toContain('Password');
  });

  it('should define a form group and form controls in the component', () => {
    expect(component.signupForm.controls['firstName']).toBeTruthy();
    expect(component.signupForm.controls['lastName']).toBeTruthy();
    expect(component.signupForm.controls['userName']).toBeTruthy();
    expect(component.signupForm.controls['email']).toBeTruthy();
    expect(component.signupForm.controls['password']).toBeTruthy();
  });

  it('should invoke "onSignup()" method handler when form submit button is clicked', () => {
    // given "onSignup()" component method
    spyOn(component, 'onSignup');

    // given the sign up form submit button
    const submitButton: HTMLButtonElement = nativeElement.querySelector(
      'form button[type="submit"]'
    );

    // when the button is clicked
    submitButton.click();

    // then the onSignup handler method should be invoked
    expect(component.onSignup).toHaveBeenCalled();
  });

  it('should invoke "userService#signUp()" with the valid form value when "onSignup()" is called', () => {
    component.observable = new Observable();

    spyOn(userService, 'signUp').and.returnValue(component.observable);
    spyOn(component.observable, 'subscribe');

    // given a valid form
    component.signupForm.patchValue({
      email: 'valid@email.com',
      password: 'v@l!d-p@$$',
    });

    // when the "onSignup()" component method is called
    component.onSignup();

    // then the user service "signUp" method should be called with the form values
    expect(userService.signUp).toHaveBeenCalledWith(component.signupForm.value);
  });

  it('should not invoke "userService#signUp()", given the form is invalid, when "onSignup()" is called', () => {
    spyOn(userService, 'signUp');

    // given an invalid form
    component.signupForm.patchValue({
      email: 'invalid_email.com',
      password: 'lmp',
    });

    // when "onLogin()" is called (form submitted)
    component.onSignup();

    // then userService#login should not be invoked
    expect(userService.signUp).not.toHaveBeenCalled();
  });

  it('should invoke "handleSuccessfulSignup()", given a valid form, when "onSignup()" is called', () => {
    // given the successful signup handler
    spyOn(component, 'handleSuccessfulSignup');

    // given the signup response
    const response = new HttpResponse();
    spyOn(userService, 'signUp').and.returnValue(of(response));

    // given a valid form
    component.signupForm.patchValue({
      email: 'valid@email.com',
      password: 'v@l!d-p@$$',
    });

    // when "onSignup()" is invoked
    component.onSignup();

    // then "handleSuccessfulSignup()" should be called with the signup response
    expect(component.handleSuccessfulSignup).toHaveBeenCalledWith(response);
  });

  fit('should store the auth token and user identifier in "localStorage" when "onSignup()" is called', () => {
    // given the "storeUserDetails()" service method
    spyOn(storageService, 'storeUserDetails');

    // given the authorization token header and user identifier
    const token =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkouUi5SLlRvbGtpZW5AZW1haWwuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ.IB_-OiA8UNtkZLL9UapBofUaJY8mRBH5SHv66HxbOmM';
    const identifier = 'J.R.R.Tolkien@email.com';

    // given the signup response
    const headers = new HttpHeaders({ Authorization: token });
    const body = { id: identifier };
    const response = new HttpResponse({ headers, body });

    // when the signup is successful
    component.handleSuccessfulSignup(response);

    // then "storeUserDetails()" should be called with the extracted token and user identifier
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
