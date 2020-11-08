import { EventEmitter } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { IssueComponent } from '../issue/issue.component';
import { IssuesComponent } from './issues.component';

describe('IssuesComponent', () => {
  let component: IssuesComponent;
  let fixture: ComponentFixture<IssuesComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IssuesComponent, IssueComponent],
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

  fit('should handle "created" event by invoking "onCreated" method', () => {
    spyOn(component, 'onCreated').and.callThrough();

    // given the form values
    const formValues = { description: 'The issue description' };

    // when a "created" event is emitted
    const issueForm = fixture.debugElement.query(By.css('app-issue-form'));
    issueForm.triggerEventHandler('created', formValues);

    // then expect the "onCreated" event handler to have been called
    expect(component.onCreated).toHaveBeenCalledWith(formValues);
  });

  it('should add a new issue when button is clicked', () => {
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
