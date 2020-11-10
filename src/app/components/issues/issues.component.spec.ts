import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { IssueFormComponent } from '../issue-form/issue-form.component';
import { IssueComponent } from '../issue/issue.component';
import { IssuesComponent } from './issues.component';

describe('IssuesComponent', () => {
  let component: IssuesComponent;
  let fixture: ComponentFixture<IssuesComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IssuesComponent, IssueComponent, IssueFormComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an issue form component', () => {
    expect(nativeElement.querySelector('app-issue-form')).toBeTruthy();
  });

  it('should render a list of issue components', () => {
    // given an issues array
    component.issues = [{}, {}, {}];

    fixture.detectChanges();

    // expect the number of rendered issue elements to be the size of the issues array
    expect(nativeElement.querySelectorAll('app-issue').length).toEqual(
      component.issues.length
    );
  });

  fit('should render an issue details component', () => {
    expect(nativeElement.querySelector('app-issue-details')).toBeTruthy();
  });

  it('should handle "created" event by invoking "onCreateIssue" method', () => {
    spyOn(component, 'onCreateIssue').and.callThrough();

    // given the form values
    const formValues = { description: 'The issue description' };

    // when a "created" event is emitted
    const issueForm: DebugElement = fixture.debugElement.query(
      By.css('app-issue-form')
    );
    issueForm.triggerEventHandler('issueCreated', formValues);

    // then expect the "onCreateIssue" event handler to have been called
    expect(component.onCreateIssue).toHaveBeenCalledWith(formValues);
  });

  it('should add the new issue details to "issues" array when "onCreateIssue" method is invoked', () => {
    // given a new issue
    const issue = { description: 'This is a new issue' };

    // when 'onCreateIssue' is called
    component.onCreateIssue(issue);

    // then the new issue should be added to the issues array
    expect(component.issues).toContain(issue);
  });

  it('should render issue details when "onCreateIssue" is invoked', () => {
    // given a new issue
    const issue = { description: 'This is a new issue' };

    // when "onCreateIssue" is called
    component.onCreateIssue(issue);

    fixture.detectChanges();

    // then the new issue should be rendered
    expect(nativeElement.querySelector('app-issue').textContent).toEqual(
      issue.description
    );
  });
});
