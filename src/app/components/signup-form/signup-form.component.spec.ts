import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
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

  it('should invoke "onSignUp()" method handler when form submit button is clicked', () => {
    // given onSignUp component method
    spyOn(component, 'onSignUp');

    // given the sign up form submit button
    const submitButton: HTMLButtonElement = nativeElement.querySelector(
      'form button[type="submit"]'
    );

    // when the button is clicked
    submitButton.click();

    // then the onSignUp handler method should be invoked
    expect(component.onSignUp).toHaveBeenCalled();
  });

  it('should invoke "userService#signUp()" when "onSignUp()" is called', () => {
    spyOn(userService, 'signUp').and.returnValue(of());

    // when the "onSignUp()" component method is called
    component.onSignUp();

    // then the user service "signUp" method should be called with the form values
    expect(userService.signUp).toHaveBeenCalledWith(component.signupForm.value);
  });

  it('should store the auth token and user identifier in "localStorage" when "onSignUp()" is called', () => {
    // given the authorization token header and user identifier
    const token =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkouUi5SLlRvbGtpZW5AZW1haWwuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ.IB_-OiA8UNtkZLL9UapBofUaJY8mRBH5SHv66HxbOmM';
    const identifier = 'J.R.R.Tolkien@email.com';

    // given the response headers and body
    const headers = new HttpHeaders({ Authorization: token });
    const body = { id: identifier };

    // given the signup response
    spyOn(userService, 'signUp').and.returnValue(
      of(new HttpResponse({ body, headers }))
    );

    // given the "storeUserDetails()" service method
    spyOn(storageService, 'storeUserDetails');

    // when "onSignUp()" is called
    component.onSignUp();

    // then "storeUserDetails()" should be called with the extracted token and user identifier
    expect(storageService.storeUserDetails).toHaveBeenCalledWith(
      jasmine.objectContaining({ identifier, token })
    );
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
});
