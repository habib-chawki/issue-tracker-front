import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { TokenService } from 'src/app/services/token/token.service';
import { UserService } from 'src/app/services/user/user.service';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let nativeElement: HTMLElement;

  let userService: UserService;
  let tokenService: TokenService;

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
    tokenService = TestBed.inject(TokenService);

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
    spyOn(userService, 'login');

    // when "onLogin()" is called (form is submitted)
    component.onLogin();

    // then userService#login should be invoked with login form values
    expect(userService.login).toHaveBeenCalledWith(component.loginForm.value);
  });

  it('should invoke tokenService#storeToken with the auth token when "onLogin()" is called', () => {
    // given the authorization token header
    const token = 'Bearer TdExx8$*sd3.sdfJTfSe22Sw.$@4sLMzzSx34dS';
    const headers = new HttpHeaders({ Authorization: token });

    // given the "storeToken" service method
    spyOn(tokenService, 'storeToken');

    // when the login service method returns a response with the auth token
    spyOn(userService, 'login').and.returnValue(
      of(new HttpResponse({ headers }))
    );

    // when the "onLogin()" method is invoked
    component.onLogin();

    // then expect tokenService#storeToken to be called with the extracted auth token
    expect(tokenService.storeToken).toHaveBeenCalledWith(token);
  });
});
