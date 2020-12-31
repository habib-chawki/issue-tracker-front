import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { CommentBuilder } from 'src/app/models/comment-builder/comment-builder';

import IssueResolution from 'src/app/models/enums/issue-resolution';
import IssueStatus from 'src/app/models/enums/issue-status';
import IssueType from 'src/app/models/enums/issue-type';

import { Issue } from 'src/app/models/issue/issue';
import { UserBuilder } from 'src/app/models/user-builder/user-builder';
import { IssueCommunicationService } from 'src/app/services/issue-communication/issue-communication.service';
import { IssueService } from 'src/app/services/issue/issue.service';

import { IssueFormComponent } from '../issue-form/issue-form.component';
import { IssuesComponent } from '../issues/issues.component';
import { Backlog } from './backlog.component';

describe('Backlog', () => {
  let component: Backlog;
  let fixture: ComponentFixture<Backlog>;
  let nativeElement: HTMLElement;

  let issueService: IssueService;
  let issueCommunicationService: IssueCommunicationService;

  let issue: Issue, issue2: Issue;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Backlog, IssueFormComponent, IssuesComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Backlog);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

    fixture.detectChanges();

    issueService = TestBed.inject(IssueService);
    issueCommunicationService = TestBed.inject(IssueCommunicationService);

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
      comments: [
        new CommentBuilder().content('comment1').owner('jon doe').build(),
        new CommentBuilder().content('comment2').owner('jane doe').build(),
      ],
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
      comments: [
        new CommentBuilder().content('comment1').owner('jon doe').build(),
        new CommentBuilder().content('comment2').owner('jane doe').build(),
        new CommentBuilder().content('comment3').owner('joe doe').build(),
      ],
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
    const addIssueButton = nativeElement.querySelector('button#add');

    // expect an add issue button to be rendered
    expect(addIssueButton).toBeTruthy();
    expect(addIssueButton.textContent).toEqual('Add issue');
  });

  describe('IssueFormComponent', () => {
    it('should invoke "onDisplayIssueForm()" when the add issue button is clicked', () => {
      spyOn(component, 'onDisplayIssueForm');

      // given the add issue button
      const addIssueButton: HTMLButtonElement = nativeElement.querySelector(
        'button#add'
      );

      // when the button is clicked
      addIssueButton.click();

      // then the "onDisplayIssueForm()" handler should be invoked
      expect(component.onDisplayIssueForm).toHaveBeenCalled();
    });

    it('should render "IssueFormComponent" when "onDisplayIssueForm()" is called', () => {
      component.onDisplayIssueForm();
      fixture.detectChanges();

      // then expect the issue form to be rendered
      expect(nativeElement.querySelector('app-issue-form')).toBeTruthy();
    });

    it('should invoke "onHideIssueForm()" when an "issueFormCancelled" event is triggered', () => {
      // given "onHideIssueForm()" handler method
      spyOn(component, 'onHideIssueForm');

      // given the issue form is displayed
      component.onDisplayIssueForm();
      fixture.detectChanges();

      // when an "issueFormCancelled" event is triggered
      fixture.debugElement
        .query(By.css('app-issue-form'))
        .triggerEventHandler('issueFormCancelled', true);

      // then "onHideIssueForm()" should be called
      expect(component.onHideIssueForm).toHaveBeenCalled();
    });

    it('should hide the "issueFormComponent" when "onHideIssueForm()" is called', () => {
      // given the form is displayed
      component.willDisplayIssueForm = true;
      fixture.detectChanges();

      expect(nativeElement.querySelector('app-issue-form')).toBeTruthy();

      // when onHideIssueForm() is called
      component.onHideIssueForm();
      fixture.detectChanges();

      // then the form should no longer be displayed
      expect(nativeElement.querySelector('app-issue-form')).toBeFalsy();
    });

    it('should handle the "issueCreated" event by invoking the "onCreateIssue()" method', () => {
      spyOn(component, 'onCreateIssue');

      // given the issue form component displayed
      component.willDisplayIssueForm = true;
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

  describe('IssueService', () => {
    it('should invoke the service method "createIssue()" when "onCreateIssue()" is called', () => {
      spyOn(issueService, 'createIssue').and.returnValue(of(issue));

      // when the "onCreateIssue()" method is invoked
      component.onCreateIssue(issue);

      // then the "createIssue()" service method should be called
      expect(issueService.createIssue).toHaveBeenCalledWith(issue);
    });

    it('should invoke the "getIssues()" service method, within "ngOnInit()"', () => {
      spyOn(issueService, 'getIssues').and.returnValue(of([issue, issue2]));

      // when "ngOnInit()" is called
      component.ngOnInit();

      // then the "getIssues()" method should be called
      expect(issueService.getIssues).toHaveBeenCalled();
    });
  });

  it('should subscribe to issueUpdate$ observable in ngOnInit()', () => {
    spyOn(issueCommunicationService.issueUpdate$, 'subscribe');
    component.ngOnInit();
    expect(issueCommunicationService.issueUpdate$.subscribe).toHaveBeenCalled();
  });

  it('should call "onUpdateIssue()" when an issue update is announced', () => {
    spyOn(component, 'onUpdateIssue');

    // when an issue update is announced
    issueCommunicationService.announceIssueUpdate(issue);

    // then onUpdateIssue() should be called
    expect(component.onUpdateIssue).toHaveBeenCalledWith(issue);
  });

  it('should set the initial form value when "onUpdateIssue()" is called', () => {
    // when "onUpdateIssue()" is called
    component.onUpdateIssue(issue2);

    // then the form value should be set
    expect(issue2).toEqual(component.formValue);
  });

  it('should display the "issueFormComponent" when "onUpdateIssue() is called"', () => {
    // issue form should not be displayed at first
    expect(component.willDisplayIssueForm).toBeFalse();

    // when "onUpdateIssue()" is called
    component.onUpdateIssue(issue2);

    // then "willDisplayIssueForm" should be set to true
    expect(component.willDisplayIssueForm).toBeTrue();
  });
});
