import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFormComponent } from './signup-form.component';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

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
  });

  fit('should render labels', () => {
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

  it('should define a form group and form controls', () => {
    expect(component.signupForm.controls['firstName']).toBeTruthy();
    expect(component.signupForm.controls['lastName']).toBeTruthy();
    expect(component.signupForm.controls['userName']).toBeTruthy();
    expect(component.signupForm.controls['email']).toBeTruthy();
    expect(component.signupForm.controls['password']).toBeTruthy();
  });
});
