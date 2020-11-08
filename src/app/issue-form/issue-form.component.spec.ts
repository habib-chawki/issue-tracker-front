import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { IssueFormComponent } from './issue-form.component';

describe('IssueFormComponent', () => {
  let component: IssueFormComponent;
  let fixture: ComponentFixture<IssueFormComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IssueFormComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueFormComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(nativeElement).toBeTruthy();
  });

  it('should render a form with a text input and a submit button', () => {
    // the form should be rendered
    expect(nativeElement.querySelector('form')).toBeTruthy();

    // the description input field shoud be rendered
    expect(nativeElement.querySelector('form input#description')).toBeTruthy();

    // the submit button should be rendered with an "Add issue" label
    expect(
      nativeElement.querySelector('form button[type="submit"]').innerHTML
    ).toContain('Add issue');
  });

  it('should define form group and form controls', () => {
    expect(component.issueForm).toBeTruthy();
    expect(component.issueForm.controls['description']).toBeTruthy();
  });

  it('should invoke onSubmit when submit button is clicked', () => {
    // given the onSubmit method
    spyOn(component, 'onSubmit').and.callThrough();

    // when the submit button is clicked
    const submitButton: HTMLElement = nativeElement.querySelector(
      'form button[type="submit"]'
    );
    submitButton.click();

    // the method should be invoked
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should emit an event with form values when onSubmit is called', () => {
    spyOn(component.created, 'emit').and.callThrough();

    // given the form values
    component.issueForm.controls['description'].setValue(
      'The issue description'
    );

    // when the onSubmit is called (submit button is clicked)
    component.onSubmit();

    // then expect an event to have been emitted with the form values
    expect(component.created.emit).toHaveBeenCalledWith({
      description: 'The issue description',
    });
  });
});
