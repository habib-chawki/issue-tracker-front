import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

import { SignupFormComponent } from './signup-form.component';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;
  let nativeElement: HTMLElement;

  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupFormComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

    userService = TestBed.inject(UserService);

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
      'button[type="submit"]'
    );

    // when the button is clicked
    submitButton.click();

    // then the onSignUp handler method should be invoked
    expect(component.onSignUp).toHaveBeenCalled();
  });

  it('should invoke "userService#signUp()" when "onSignUp()" is called', () => {
    spyOn(userService, 'signUp');

    // when the "onSignUp()" component method is called
    component.onSignUp();

    // then the user service "signUp" method should be called with the form values
    expect(userService.signUp).toHaveBeenCalledWith(component.signupForm.value);
  });
});
