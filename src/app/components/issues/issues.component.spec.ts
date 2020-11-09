import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { IssueFormComponent } from 'src/app/components/issue-form/issue-form.component';
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
    expect(nativeElement.querySelectorAll('app-issue').length).toEqual(
      component.issues.length
    );
  });

  it('should handle "created" event by invoking "onCreate" method', () => {
    spyOn(component, 'onCreate').and.callThrough();

    // given the form values
    const formValues = { description: 'The issue description' };

    // when a "created" event is emitted
    const issueForm: DebugElement = fixture.debugElement.query(
      By.css('app-issue-form')
    );
    issueForm.triggerEventHandler('issueCreated', formValues);

    // then expect the "onCreate" event handler to have been called
    expect(component.onCreate).toHaveBeenCalledWith(formValues);
  });

  it('should add the new issue details to "issues" array when "onCreate" method is invoked', () => {
    // given a new issue
    const issue = { description: 'This is a new issue' };

    // when 'onCreate' is called
    component.onCreate(issue);

    // then the new issue should be added to the issues array
    expect(component.issues).toContain(issue);
  });

  it('should add a new issue with proper details extracted from form inputs when "Add issue" button is clicked', () => {
    spyOn(component, 'onAddIssue').and.callThrough();

    // given the issues list
    const numberOfIssues = component.issues.length;
    const button = nativeElement.querySelector('button');

    // when the button is clicked
    button.click();

    // then the new issue should be added
    expect(component.onAddIssue).toHaveBeenCalled();
    expect(component.issues.length).toEqual(numberOfIssues + 1);

    // when the button is clicked one more time
    button.click();

    // then another issue should be added successfully
    expect(component.onAddIssue).toHaveBeenCalled();
    expect(component.issues.length).toEqual(numberOfIssues + 2);
  });
});
