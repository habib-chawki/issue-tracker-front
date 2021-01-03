import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
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

  it('should call userService#login() with form values when "onLogin()" is called', () => {
    // given userService#login handler method
    spyOn(userService, 'login').and.returnValue(of());

    // when "onLogin()" is called (form is submitted)
    component.onLogin();

    // then userService#login should be invoked with login form values
    expect(userService.login).toHaveBeenCalledWith(component.loginForm.value);
  });

  it('should store the auth token and user identifier in "localStorage" when "onLogin()" is called', () => {
    // given the user identifier and auth token
    const identifier = 'George.R.R.Martin@email.com';
    const token =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ikdlb3JnZS5SLlIuTWFydGluQGVtYWlsLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.Qx4-yL0S1D95hekkN3tLgwiFQdytsE95gp9a3QNK2sA';

    // given the response body and headers
    const headers = new HttpHeaders({ Authorization: token });
    const body = { id: identifier };

    // given the "storeUserDetails" service method
    spyOn(storageService, 'storeUserDetails');

    // given the login response
    spyOn(userService, 'login').and.returnValue(
      of(new HttpResponse({ body, headers }))
    );

    // when the "onLogin()" method is invoked
    component.onLogin();

    // then tokenService#storeUserDetails should be called with the auth token and user identifier
    expect(storageService.storeUserDetails).toHaveBeenCalledWith(
      jasmine.objectContaining({ identifier, token })
    );
  });

  fit('should validate email', () => {
    const invalidEmail = 'this-email-is-invalid';
    const validEmail = 'this-email-is-valid@email.com';

    // should invalidate email
    component.email.setValue(invalidEmail);
    expect(component.email.valid).toBeFalse();

    // should validate email
    component.email.setValue(validEmail);
    expect(component.email.valid).toBeTrue();
  });
});
