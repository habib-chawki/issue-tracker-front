import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import IssueResolution from 'src/app/models/enums/issue-resolution';
import IssueStatus from 'src/app/models/enums/issue-status';
import IssueType from 'src/app/models/enums/issue-type';
import { IssueBuilder } from 'src/app/models/issue-builder/issue-builder';
import { Issue } from 'src/app/models/issue/issue';

import { IssueFormComponent } from './issue-form.component';

fdescribe('IssueFormComponent', () => {
  let component: IssueFormComponent;
  let fixture: ComponentFixture<IssueFormComponent>;
  let nativeElement: HTMLElement;

  let issue: Issue;

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

    // given an issue
    issue = new IssueBuilder()
      .description('Issue description')
      .summary('Issue summary')
      .type(IssueType.Bug)
      .status(IssueStatus.InProgress)
      .resolution(IssueResolution.Duplicate)
      .estimate(new Date())
      .build();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(nativeElement).toBeTruthy();
  });

  it('should render a form with input fields for each issue detail', () => {
    // the form should be rendered with every issue detail input field
    expect(nativeElement.querySelector('form')).toBeTruthy();

    // "summary" input text
    expect(
      nativeElement.querySelector(
        'form input#summary[formControlName="summary"]'
      )
    ).toBeTruthy();

    // "description" text area
    expect(
      nativeElement.querySelector(
        'form textarea#description[formControlName="description"]'
      )
    ).toBeTruthy();

    // "type" select
    expect(
      nativeElement.querySelector('form select#type[formControlName="type"]')
    ).toBeTruthy();

    // "status" select
    expect(
      nativeElement.querySelector(
        'form select#status[formControlName="status"]'
      )
    ).toBeTruthy();

    // "resolution" select
    expect(
      nativeElement.querySelector(
        'form select#resolution[formControlName="resolution"]'
      )
    ).toBeTruthy();

    // "assignee" text input
    expect(
      nativeElement.querySelector(
        'form input#assignee[formControlName="assignee"]'
      )
    ).toBeTruthy();

    // "estimate" time
    expect(
      nativeElement.querySelector(
        'form input#estimate[formControlName="estimate"]'
      )
    ).toBeTruthy();
  });

  it('should render a "Save" submit button', () => {
    expect(
      nativeElement.querySelector('form button[type="submit"]').innerHTML
    ).toContain('Save');
  });

  it('should render a "Cancel" form button', () => {
    expect(
      nativeElement.querySelector('form button#cancel').textContent
    ).toContain('Cancel');
  });

  it('should render issue "type" options based on the values of the "IssueType" enum', () => {
    // given the list of the "type" select options
    const types = [];

    nativeElement
      .querySelectorAll('select#type option')
      .forEach((option) => types.push(option.innerHTML.trim()));

    // the options should be the values of the "IssueType" enum
    expect(types).toEqual(Object.values(IssueType));
  });

  it('should render issue "status" options based on the values of the "IssueStatus" enum', () => {
    // given the list of the "status" select options
    const statuses = [];

    nativeElement
      .querySelectorAll('select#status option')
      .forEach((option) => statuses.push(option.innerHTML.trim()));

    // the options should be the values of the "IssueStatus" enum
    expect(statuses).toEqual(Object.values(IssueStatus));
  });

  it('should render issue "resolution" options based on the values of the "IssueResolution" enum', () => {
    // given the list of the "resolution" select options
    const resolutions = [];

    nativeElement
      .querySelectorAll('select#resolution option')
      .forEach((option) => resolutions.push(option.innerHTML.trim()));

    // the options should be the values of the "IssueResolution" enum
    expect(resolutions).toEqual(Object.values(IssueResolution));
  });

  it('should define a form group and form controls', () => {
    expect(component.issueForm).toBeTruthy();

    expect(component.issueForm.controls['summary']).toBeTruthy();
    expect(component.issueForm.controls['description']).toBeTruthy();
    expect(component.issueForm.controls['type']).toBeTruthy();
    expect(component.issueForm.controls['status']).toBeTruthy();
    expect(component.issueForm.controls['resolution']).toBeTruthy();
    expect(component.issueForm.controls['assignee']).toBeTruthy();
    expect(component.issueForm.controls['estimate']).toBeTruthy();
  });

  it('should invoke "onSave()" when the submit button is clicked', () => {
    // given the "onSave()" method
    spyOn(component, 'onSave');

    // when the submit button is clicked
    const submitButton: HTMLButtonElement = nativeElement.querySelector(
      'form button[type="submit"]'
    );
    submitButton.click();

    // then the method should be invoked
    expect(component.onSave).toHaveBeenCalled();
  });

  it('should emit an "issueFormSaved" event when "onSave()" is called', () => {
    spyOn(component.issueFormSaved, 'emit');

    // given the form value
    component.issueForm.patchValue(issue);

    // when "onSave()" is called
    component.onSave();

    // then an event should be emitted with the form value
    expect(component.issueFormSaved.emit).toHaveBeenCalledWith(
      component.issueForm.value
    );
  });

  it('should invoke "onCancel()" handler method when the "Cancel" button is clicked', () => {
    spyOn(component, 'onCancel');

    // given the form cancel button
    const cancelButton: HTMLButtonElement = nativeElement.querySelector(
      'button#cancel'
    );

    // when the button is clicked
    cancelButton.click();

    // then "onCancel()" handler method should be called
    expect(component.onCancel).toHaveBeenCalled();
  });

  it('should emit an "issueFormCancelled" event when "onCancel()" is called', () => {
    // given the issueFormCancelled event emitter
    spyOn(component.issueFormCancelled, 'emit');

    // when onCancel() is called
    component.onCancel();

    // then an "issueFormCancelled" event should be emitted
    expect(component.issueFormCancelled.emit).toHaveBeenCalled();
  });

  it('should initialize the form value in ngOnInit()', () => {
    // the form value should not be initialized at first
    expect(issue).not.toEqual(
      jasmine.objectContaining(component.issueForm.value)
    );

    // when the initialFormValue is set
    component.initialFormValue = issue;
    fixture.detectChanges();

    // when ngOnInit() is called
    component.ngOnInit();

    // then the form value should be initialized with the issue property values
    expect(issue).toEqual(jasmine.objectContaining(component.issueForm.value));
  });
});
