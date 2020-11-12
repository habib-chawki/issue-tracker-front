import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import IssueResolution from 'src/app/models/enums/issue-resolution';
import IssueStatus from 'src/app/models/enums/issue-status';
import IssueType from 'src/app/models/enums/issue-type';

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

    // summary input text
    expect(
      nativeElement.querySelector(
        'form input#summary[formControlName="summary"]'
      )
    ).toBeTruthy();

    // description text area
    expect(
      nativeElement.querySelector(
        'form textarea#description[formControlName="description"]'
      )
    ).toBeTruthy();

    // type select
    expect(
      nativeElement.querySelector('form select#type[formControlName="type"]')
    ).toBeTruthy();

    // status select
    expect(
      nativeElement.querySelector(
        'form select#status[formControlName="status"]'
      )
    ).toBeTruthy();

    // resolution select
    expect(
      nativeElement.querySelector(
        'form select#resolution[formControlName="resolution"]'
      )
    ).toBeTruthy();

    // assignee text input
    expect(
      nativeElement.querySelector(
        'form input#assignee[formControlName="assignee"]'
      )
    ).toBeTruthy();

    // reporter text input
    expect(
      nativeElement.querySelector(
        'form input#reporter[formControlName="reporter"]'
      )
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
    expect(component.issueForm.controls['summary']).toBeTruthy();
    expect(component.issueForm.controls['type']).toBeTruthy();
    expect(component.issueForm.controls['status']).toBeTruthy();
    expect(component.issueForm.controls['resolution']).toBeTruthy();
    expect(component.issueForm.controls['assignee']).toBeTruthy();
    expect(component.issueForm.controls['reporter']).toBeTruthy();
    expect(component.issueForm.controls['comments']).toBeTruthy();
    expect(component.issueForm.controls['votes']).toBeTruthy();
    expect(component.issueForm.controls['watchers']).toBeTruthy();
    expect(component.issueForm.controls['created']).toBeTruthy();
    expect(component.issueForm.controls['updated']).toBeTruthy();
    expect(component.issueForm.controls['estimate']).toBeTruthy();
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
    spyOn(component.issueCreated, 'emit');

    const issue = {
      description: 'Issue description',
      summary: 'Issue summary',
      type: IssueType.Bug,
      status: IssueStatus.InProgress,
      resolution: IssueResolution.Duplicate,
      assignee: 'Me',
      reporter: 'Someone',
      comments: ['comment1', 'comment2'],
      votes: 8,
      watchers: ['jon', 'jane'],
      created: new Date(),
      updated: new Date(),
      estimate: new Date(),
    };

    // given the form values
    component.issueForm.setValue(issue);

    // when the onSubmit is called (submit button is clicked)
    component.onSubmit();

    // then expect an event to have been emitted with the form values
    expect(component.issueCreated.emit).toHaveBeenCalledWith(issue);
  });
});
