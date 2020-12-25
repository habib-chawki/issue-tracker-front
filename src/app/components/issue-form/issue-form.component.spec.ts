import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import IssueResolution from 'src/app/models/enums/issue-resolution';
import IssueStatus from 'src/app/models/enums/issue-status';
import IssueType from 'src/app/models/enums/issue-type';
import { IssueCommunicationService } from 'src/app/services/issue-communication/issue-communication.service';

import { IssueFormComponent } from './issue-form.component';

describe('IssueFormComponent', () => {
  let component: IssueFormComponent;
  let fixture: ComponentFixture<IssueFormComponent>;
  let nativeElement: HTMLElement;

  let issueCommunicationService: IssueCommunicationService;

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

    issueCommunicationService = TestBed.inject(IssueCommunicationService);

    fixture.detectChanges();
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

    // the submit button should be rendered with an "Add issue" label
    expect(
      nativeElement.querySelector('form button[type="submit"]').innerHTML
    ).toContain('Add issue');
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

  it('should invoke "onSubmit()" when the submit button is clicked', () => {
    // given the "onSubmit()" method
    spyOn(component, 'onSubmit');

    // when the submit button is clicked
    const submitButton: HTMLButtonElement = nativeElement.querySelector(
      'form button[type="submit"]'
    );
    submitButton.click();

    // then the method should be invoked
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should announce that the issue is created when "onSubmit()" is called', () => {
    spyOn(issueCommunicationService, 'announceIssueCreated');

    // given the form value
    const formValue = {
      description: 'Issue description',
      summary: 'Issue summary',
      type: IssueType.Bug,
      status: IssueStatus.InProgress,
      resolution: IssueResolution.Duplicate,
      assignee: 'Me',
      estimate: new Date(),
    };

    component.issueForm.setValue(formValue);

    // when "onSubmit()" is called
    component.onSubmit();

    // then an event should be emitted with the form value
    expect(issueCommunicationService.announceIssueCreated).toHaveBeenCalledWith(
      formValue
    );
  });
});
