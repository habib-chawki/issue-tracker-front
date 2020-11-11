import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Issue } from 'src/app/models/issue';

import { IssueDetailsComponent } from '../issue-details/issue-details.component';
import { IssueFormComponent } from '../issue-form/issue-form.component';
import { IssueComponent } from '../issue/issue.component';
import { IssuesComponent } from './issues.component';

describe('IssuesComponent', () => {
  let component: IssuesComponent;
  let fixture: ComponentFixture<IssuesComponent>;
  let nativeElement: HTMLElement;

  let issue: Issue;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IssuesComponent,
        IssueComponent,
        IssueFormComponent,
        IssueDetailsComponent,
      ],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

    fixture.detectChanges();

    // set up an issue with details
    issue = {
      key: 'Dh85m',
      description: 'Issue description',
      summary: 'Issue summary',
      type: 'Story',
      status: 'Todo',
      resolution: 'Done',
      assignee: 'Me',
      reporter: 'Someone',
      comments: ['comment1', 'comment2'],
      votes: 8,
      watchers: ['jon', 'jane'],
      created: new Date(),
      updated: new Date(),
      estimate: new Date(),
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a list of issue components', () => {
    // given an issues array
    component.issues = [{} as Issue, {} as Issue, {} as Issue];

    fixture.detectChanges();

    // expect the number of rendered issue elements to be the size of the issues array
    expect(nativeElement.querySelectorAll('app-issue').length).toEqual(
      component.issues.length
    );
  });

  it('should handle "created" event by invoking "onCreateIssue()" method', () => {
    spyOn(component, 'onCreateIssue');

    // given the issue form component displayed
    component.displayForm = true;
    fixture.detectChanges();

    // when a "created" event is emitted
    const issueForm: DebugElement = fixture.debugElement.query(
      By.css('app-issue-form')
    );
    issueForm.triggerEventHandler('issueCreated', issue);

    // then expect the "onCreateIssue" event handler to have been called
    expect(component.onCreateIssue).toHaveBeenCalledWith(issue);
  });

  it('should add the new issue details to "issues" array when "onCreateIssue()" is invoked', () => {
    // when 'onCreateIssue' is called
    component.onCreateIssue(issue);

    // then the new issue should be added to the issues array
    expect(component.issues).toContain(issue);
  });

  it('should render the issue element when "onCreateIssue()" is invoked', () => {
    // when "onCreateIssue" is called
    component.onCreateIssue(issue);

    fixture.detectChanges();

    // then the new issue should be rendered
    expect(nativeElement.querySelector('app-issue').textContent).toContain(
      issue.description
    );
  });

  it('should invoke "onDisplayIssueDetails()" when an "issueClicked" event is emitted', () => {
    spyOn(component, 'onDisplayIssueDetails');

    // given a new issue
    component.issues.push(issue);

    fixture.detectChanges();

    // when an "issueClicked" event is triggered
    const issueElement: DebugElement = fixture.debugElement.query(
      By.css('app-issue')
    );
    issueElement.triggerEventHandler('issueClicked', issue);

    // the "onDisplayIssueDetails" handler method should be called
    expect(component.onDisplayIssueDetails).toHaveBeenCalledWith(issue);
  });

  it('should invoke "onDisplayIssueDetails()" when an issue is clicked', () => {
    spyOn(component, 'onDisplayIssueDetails');

    // give an issue
    component.issues.push(issue);

    fixture.detectChanges();

    // when the issue is clicked
    const issueElement: HTMLElement = nativeElement.querySelector(
      'app-issue div'
    );
    issueElement.click();

    // the issueClicked event handler should be invoked with the issue details
    expect(component.onDisplayIssueDetails).toHaveBeenCalledWith(issue);
  });

  it('should render issue details when "onDisplayIssueDetails()" is invoked', () => {
    // no issue details should be present at first
    expect(nativeElement.querySelector('app-issue-details')).toBeFalsy();

    // when onDisplayIssueDetails is invoked with an issue details
    component.onDisplayIssueDetails(issue);

    fixture.detectChanges();

    // then expect the issueDetails component to be rendered with the proper details
    expect(nativeElement.querySelector('app-issue-details')).toBeTruthy();
    expect(
      nativeElement.querySelector('app-issue-details div').textContent
    ).toContain(issue.description);
  });

  it('should render an "Add issue" button', () => {
    const addIssueButton = nativeElement.querySelector('button.addIssue');

    // expect an add issue button to be rendered
    expect(addIssueButton).toBeTruthy();
    expect(addIssueButton.textContent).toEqual('Add issue');
  });

  it('should invoke "onDisplayIssueForm()" when the add issue button is clicked', () => {
    spyOn(component, 'onDisplayIssueForm');
    // given the add issue button
    const addIssueButton: HTMLButtonElement = nativeElement.querySelector(
      'button.addIssue'
    );

    // when the button is clicked
    addIssueButton.click();

    // then the 'onDisplayIssueForm()' handler should be invoked
    expect(component.onDisplayIssueForm).toHaveBeenCalled();
  });

  it('should render the add issue form when the add button is clicked', () => {
    // add issue form should be hidden at first
    expect(nativeElement.querySelector('app-issue-form')).toBeFalsy();

    // given the add issue button
    const addIssueButton: HTMLButtonElement = nativeElement.querySelector(
      'button.addIssue'
    );

    // when the button is clicked
    addIssueButton.click();

    fixture.detectChanges();

    // then expect the issue form to be rendered
    expect(nativeElement.querySelector('app-issue-form')).toBeTruthy();
  });
});
