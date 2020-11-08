import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { IssueFormComponent } from './issue-form.component';

describe('IssueFormComponent', () => {
  let component: IssueFormComponent;
  let fixture: ComponentFixture<IssueFormComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueFormComponent ], 
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueFormComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a form with a text input and a submit button', () => {
    // the form should be rendered
    expect(nativeElement.querySelector('form')).toBeTruthy();

    // the description input field shoud be rendered
    expect(nativeElement.querySelector('form input#description')).toBeTruthy();

    // the submit button should be rendered with an add issue label
    expect(nativeElement.querySelector('form button[type="submit"]').innerHTML).toContain('Add issue');
  });

  it('should invoke onSubmit when form is submitted', () => {
    // given the onSubmit method
    spyOn(component, "onSubmit").and.callThrough();

    // when the submit button is clicked
    const submitButton: HTMLElement = nativeElement.querySelector('form button[type="submit"]');
    submitButton.click();

    // the method should be invoked
    expect(component.onSubmit).toHaveBeenCalled();
  });

  fit('should add a "description" form control to the form group', () => {
    expect(component.issueForm.controls['description']).toBeDefined();
  });

});
