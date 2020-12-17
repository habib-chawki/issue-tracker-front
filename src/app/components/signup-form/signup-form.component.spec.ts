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

  fit('should render signup form', () => {
    // form should be renderd
    expect(nativeElement.querySelector('form')).toBeTruthy();

    expect(nativeElement.querySelector('input#first-name')).toBeTruthy();
    expect(nativeElement.querySelector('input#last-name')).toBeTruthy();
    expect(nativeElement.querySelector('input#username')).toBeTruthy();
    expect(nativeElement.querySelector('input#email')).toBeTruthy();
    expect(nativeElement.querySelector('input#password')).toBeTruthy();
  });
});
