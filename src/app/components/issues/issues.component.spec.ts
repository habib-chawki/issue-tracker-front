import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import IssueResolution from 'src/app/models/enums/issue-resolution';
import IssueStatus from 'src/app/models/enums/issue-status';
import IssueType from 'src/app/models/enums/issue-type';

import { Issue } from 'src/app/models/issue/issue';
import { UserBuilder } from 'src/app/models/user-builder/user-builder';
import { IssueService } from 'src/app/services/issue/issue.service';

import { IssueDetailsComponent } from '../issue-details/issue-details.component';
import { IssueFormComponent } from '../issue-form/issue-form.component';
import { IssueComponent } from '../issue/issue.component';
import { IssuesComponent } from './issues.component';

describe('IssuesComponent', () => {
  let component: IssuesComponent;
  let fixture: ComponentFixture<IssuesComponent>;
  let nativeElement: HTMLElement;

  let issueService: IssueService;

  let issue: Issue, issue2: Issue;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IssuesComponent,
        IssueComponent,
        IssueFormComponent,
        IssueDetailsComponent,
      ],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

    fixture.detectChanges();

    issueService = TestBed.inject(IssueService);

    // set up an issue with details
    issue = {
      id: '1',
      key: 'Dh85m',
      description: 'Issue description',
      summary: 'Issue summary',
      type: IssueType.Bug,
      status: IssueStatus.InProgress,
      resolution: IssueResolution.Duplicate,
      assignee: new UserBuilder().username('Me').build(),
      reporter: new UserBuilder().username('Someone').build(),
      comments: ['comment1', 'comment2'],
      votes: 8,
      watchers: ['jon', 'jane'],
      creationTime: new Date(),
      updateTime: new Date(),
      estimate: new Date(),
    };

    // set up another issue
    issue2 = {
      id: '2',
      key: 'Rt9xP',
      description: 'Issue 2 description',
      summary: 'Issue 2 summary',
      type: IssueType.Story,
      status: IssueStatus.Todo,
      resolution: IssueResolution.Unresolved,
      assignee: new UserBuilder().username('You').build(),
      reporter: new UserBuilder().username('Someone else').build(),
      comments: ['comment1', 'comment2', 'comment3'],
      votes: 2,
      watchers: [],
      creationTime: new Date(),
      updateTime: new Date(),
      estimate: new Date(),
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an "Add issue" button', () => {
    const addIssueButton = nativeElement.querySelector('button.add-issue');

    // expect an add issue button to be rendered
    expect(addIssueButton).toBeTruthy();
    expect(addIssueButton.textContent).toEqual('Add issue');
  });

  it('should invoke "onDisplayIssueForm()" when the add issue button is clicked', () => {
    spyOn(component, 'onDisplayIssueForm');

    // given the add issue button
    const addIssueButton: HTMLButtonElement = nativeElement.querySelector(
      'button.add-issue'
    );

    // when the button is clicked
    addIssueButton.click();

    // then the "onDisplayIssueForm()" handler should be invoked
    expect(component.onDisplayIssueForm).toHaveBeenCalled();
  });

  describe('IssueComponent', () => {
    it('should render a list of issue components', () => {
      // given an issues array
      component.issues = [issue, issue2];

      fixture.detectChanges();

      // expect the number of rendered issue elements to be the size of the issues array
      expect(nativeElement.querySelectorAll('app-issue').length).toEqual(
        component.issues.length
      );
    });

    it('should render the issue component when "onCreateIssue()" is invoked', () => {
      // when the "createIssue()" service method returns an observable of issue
      spyOn(issueService, 'createIssue').and.returnValue(of(issue));

      // when "onCreateIssue()" is called
      component.onCreateIssue(issue);
      fixture.detectChanges();

      // then the new issue should be rendered
      expect(nativeElement.querySelector('app-issue').textContent).toContain(
        issue.type
      );

      expect(nativeElement.querySelector('app-issue').textContent).toContain(
        issue.summary
      );
    });

    it('should invoke "onDisplayIssueDetails()" when an issue is clicked', () => {
      spyOn(component, 'onDisplayIssueDetails');

      // given an issue
      component.issues.push(issue);
      fixture.detectChanges();

      // when the issue is clicked
      const issueElement: HTMLElement = nativeElement.querySelector(
        'app-issue div'
      );
      issueElement.click();

      // then the "onDisplayIssueDetails()" event handler should be invoked with the issue details
      expect(component.onDisplayIssueDetails).toHaveBeenCalledWith(issue);
    });

    it('should invoke "onRemoveIssue()" when an "issueRemoved" event is triggered', () => {
      // given the onRemoveIssue handler method
      spyOn(component, 'onRemoveIssue');

      // given an issue component
      component.issues.push(issue);
      fixture.detectChanges();

      // when the app-issue component emits an "issueRemoved" event
      const appIssue: DebugElement = fixture.debugElement.query(
        By.css('app-issue')
      );
      appIssue.triggerEventHandler('issueRemoved', issue);

      expect(component.onRemoveIssue).toHaveBeenCalledWith(issue);
    });

    it('should remove the issue from the issues list when "onRemoveIssue()" is invoked', () => {
      // given an issue
      component.issues.push(issue);

      // when onRemoveIssue is called
      component.onRemoveIssue(issue);

      // then the issue should be removed from the list of issues
      expect(
        component.issues.find((element) => element === issue)
      ).toBeUndefined();
    });

    it('should remove the issue from the issues list when "onRemoveIssue()" is invoked', () => {
      // given the list of issues
      component.issues = [issue, issue2];

      // when onRemoveIssue is invoked
      component.onRemoveIssue(issue2);

      // then the issue should be removed from the list of issues
      expect(
        component.issues.find((element) => element === issue2)
      ).toBeUndefined();
    });

    it('should remove the issue component when "onRemoveIssue()" is invoked', () => {
      // given a list of issues
      component.issues = [issue, issue2];
      fixture.detectChanges();

      // given the size of the issues list
      const issuesListSize = component.issues.length;

      // expect the list of issues to have been rendered
      expect(nativeElement.querySelectorAll('app-issue').length).toBe(
        issuesListSize
      );

      // when an issue is removed
      component.onRemoveIssue(issue2);
      fixture.detectChanges();

      // then the issue component should also be removed
      expect(nativeElement.querySelectorAll('app-issue').length).toBe(
        issuesListSize - 1
      );
    });
  });

  describe('IssueFormComponent', () => {
    it('should render the add issue form when the add button is clicked', () => {
      // add issue form should be hidden at first
      expect(nativeElement.querySelector('app-issue-form')).toBeFalsy();

      // given the add issue button
      const addIssueButton: HTMLButtonElement = nativeElement.querySelector(
        'button.add-issue'
      );

      // when the button is clicked
      addIssueButton.click();
      fixture.detectChanges();

      // then expect the issue form to be rendered
      expect(nativeElement.querySelector('app-issue-form')).toBeTruthy();
    });

    it('should handle the "issueCreated" event by invoking the "onCreateIssue()" method', () => {
      spyOn(component, 'onCreateIssue');

      // given the issue form component displayed
      component.displayForm = true;
      fixture.detectChanges();

      // when a "created" event is emitted
      const issueForm: DebugElement = fixture.debugElement.query(
        By.css('app-issue-form')
      );
      issueForm.triggerEventHandler('issueCreated', issue);

      // then expect the "onCreateIssue()" event handler to have been called
      expect(component.onCreateIssue).toHaveBeenCalledWith(issue);
    });

    it('should add the new issue to the "issues" array when "onCreateIssue()" is invoked', () => {
      spyOn(issueService, 'createIssue').and.returnValue(of(issue));

      // when 'onCreateIssue()' is called
      component.onCreateIssue(issue);

      // then the new issue should be added to the issues array
      expect(component.issues).toContain(issue);
    });
  });

  describe('IssueDetailsComponent', () => {
    it('should render issue details when "onDisplayIssueDetails()" is invoked', () => {
      // no issue details should be present at first
      expect(nativeElement.querySelector('app-issue-details')).toBeFalsy();

      // when "onDisplayIssueDetails()" is invoked with an issue details
      component.onDisplayIssueDetails(issue);

      fixture.detectChanges();

      // then expect the issueDetails component to be rendered
      expect(nativeElement.querySelector('app-issue-details')).toBeTruthy();
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

      // the "onDisplayIssueDetails()" handler method should be called
      expect(component.onDisplayIssueDetails).toHaveBeenCalledWith(issue);
    });
  });

  describe('IssueService', () => {
    it('should invoke the service method "createIssue()" when "onCreateIssue()" is called', () => {
      spyOn(issueService, 'createIssue').and.returnValue(of(issue));

      // when the "onCreateIssue()" method is invoked
      component.onCreateIssue(issue);

      // then the "createIssue()" service method should be called
      expect(issueService.createIssue).toHaveBeenCalledWith(issue);
    });

    it('should invoke the service method "getIssues()" when "ngOnInit()" is first called', () => {
      spyOn(issueService, 'getIssues').and.returnValue(of([issue, issue2]));

      // when "ngOnInit()" is called
      component.ngOnInit();

      // then the "getIssues()" method should be called
      expect(issueService.getIssues).toHaveBeenCalled();
    });
  });
});
