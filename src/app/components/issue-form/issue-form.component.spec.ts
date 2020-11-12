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

  fit('should render a form to input every issue detail', () => {
    // the form should be rendered
    expect(nativeElement.querySelector('form')).toBeTruthy();

    // every issue detail input field shoud be rendered
    expect(
      nativeElement.querySelector(
        'form input#description[formControlName="description"]'
      )
    ).toBeTruthy();
    expect(
      nativeElement.querySelector(
        'form input#summary[formControlName="summary"]'
      )
    ).toBeTruthy();
    expect(
      nativeElement.querySelector('form input#type[formControlName="type"]')
    ).toBeTruthy();
    expect(
      nativeElement.querySelector('form input#status[formControlName="status"]')
    ).toBeTruthy();
    expect(
      nativeElement.querySelector(
        'form input#resolution[formControlName="resolution"]'
      )
    ).toBeTruthy();
    expect(
      nativeElement.querySelector(
        'form input#assignee[formControlName="assignee"]'
      )
    ).toBeTruthy();
    expect(
      nativeElement.querySelector(
        'form input#reporter[formControlName="reporter"]'
      )
    ).toBeTruthy();
    expect(
      nativeElement.querySelector(
        'form input#comments[formControlName="comments"]'
      )
    ).toBeTruthy();
    expect(
      nativeElement.querySelector('form input#votes[formControlName="votes"]')
    ).toBeTruthy();
    expect(
      nativeElement.querySelector(
        'form input#watchers[formControlName="watchers"]'
      )
    ).toBeTruthy();
    expect(
      nativeElement.querySelector(
        'form input#created[formControlName="created"]'
      )
    ).toBeTruthy();
    expect(
      nativeElement.querySelector(
        'form input#updated[formControlName="updated"]'
      )
    ).toBeTruthy();
    expect(
      nativeElement.querySelector(
        'form input#estimate[formControlName="estimate"]'
      )
    ).toBeTruthy();

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
    spyOn(component.issueCreated, 'emit').and.callThrough();

    // given the form values
    component.issueForm.controls['description'].setValue(
      'The issue description'
    );

    // when the onSubmit is called (submit button is clicked)
    component.onSubmit();

    // then expect an event to have been emitted with the form values
    expect(component.issueCreated.emit).toHaveBeenCalledWith({
      description: 'The issue description',
    });
  });
});
