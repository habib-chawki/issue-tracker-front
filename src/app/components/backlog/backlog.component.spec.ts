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

    it('should handle the "issueFormSaved" event by invoking the "onSaveIssue()" method', () => {
      spyOn(component, 'onSaveIssue');

      // given the issue form component displayed
      component.willDisplayIssueForm = true;
      fixture.detectChanges();

      // when a "issueFormSaved" event is emitted
      const issueForm: DebugElement = fixture.debugElement.query(
        By.css('app-issue-form')
      );
      issueForm.triggerEventHandler('issueFormSaved', issue);

      // then expect the "onSaveIssue()" event handler to have been called
      expect(component.onSaveIssue).toHaveBeenCalledWith(issue);
    });
  });

  describe('IssueService', () => {
    it('should invoke the "getIssues()" service method, within "ngOnInit()"', () => {
      spyOn(issueService, 'getIssues').and.returnValue(of([issue, issue2]));

      // when "ngOnInit()" is called
      component.ngOnInit();

      // then the "getIssues()" method should be called
      expect(issueService.getIssues).toHaveBeenCalled();
    });

    it('should invoke "IssueService" when "createIssue()" is called', () => {
      spyOn(issueService, 'createIssue').and.returnValue(of(issue));

      // when the "createIssue()" method is invoked
      component.createIssue(issue);

      // then the "createIssue()" service method should be called
      expect(issueService.createIssue).toHaveBeenCalledWith(issue);
    });

    it('should invoke "IssueService" when "updateIssue()" is called', () => {
      spyOn(issueService, 'updateIssue').and.returnValue(of(issue));

      // when "updateIssue()" is called
      component.updateIssue(issue);

      // then the "updateIssue()" service method should be called
      expect(issueService.updateIssue).toHaveBeenCalledWith(issue);
    });
  });

  describe('IssueCommunicationService', () => {
    it('should subscribe to "issueUpdate$" observable in "ngOnInit()"', () => {
      spyOn(issueCommunicationService.issueUpdate$, 'subscribe');
      component.ngOnInit();
      expect(
        issueCommunicationService.issueUpdate$.subscribe
      ).toHaveBeenCalled();
    });

    it('should call "handleIssueUpdate()" when an issue update is announced', () => {
      spyOn(component, 'handleIssueUpdate');

      // when an issue update is announced
      issueCommunicationService.announceIssueUpdate(issue);

      // then handleIssueUpdate() should be called
      expect(component.handleIssueUpdate).toHaveBeenCalledWith(issue);
    });

    it('should set the initial form value when "handleIssueUpdate()" is called', () => {
      // when "handleIssueUpdate()" is called
      component.handleIssueUpdate(issue2);

      // then the form value should be set
      expect(issue2).toEqual(component.formValue);
    });

    it('should display the "issueFormComponent" when "handleIssueUpdate() is called"', () => {
      // "issueFormComponent" should not be displayed at first
      expect(nativeElement.querySelector('app-issue-form')).toBeFalsy();

      // when "handleIssueUpdate()" is called
      component.handleIssueUpdate(issue2);
      fixture.detectChanges();

      // then "issueFormComponent" should be displayed
      expect(nativeElement.querySelector('app-issue-form')).toBeTruthy();
    });
  });

  it('should add the new issue to the "issues" array when "createIssue()" is invoked', () => {
    spyOn(issueService, 'createIssue').and.returnValue(of(issue));

    // when 'createIssue()' is called
    component.createIssue(issue);

    // then the new issue should be added to the issues array
    expect(component.issues).toContain(issue);
  });

  it('should update the issue in the "issues" array when "updateIssue()" is invoked', () => {
    // given the issues array
    component.issues = [issue, issue2];

    // given the issue is updated
    const updatedIssue = {
      ...issue,
      description: 'Some new updated description',
      status: IssueStatus.Done,
    };

    spyOn(issueService, 'updateIssue').and.returnValue(of(updatedIssue));

    // when "updateIssue()" is called
    component.updateIssue(updatedIssue);

    // then the issue in the issues array should be updated
    expect(component.issues).toContain(updatedIssue);
    expect(component.issues).not.toContain(issue);
  });

  it('should invoke "createIssue()" when the issue is not already in the issues array when "onSaveIssue()" is called', () => {
    // given the "createIssue()" method
    spyOn(component, 'createIssue');

    // when "onSaveIssue()" is called and the issues array does not contain the issue
    component.onSaveIssue(issue);

    // then "createIssue()" should be called
    expect(component.createIssue).toHaveBeenCalledWith(issue);
  });

  it('should invoke "updateIssue()" when the issue is already in the issues array when "onSaveIssue()" is called', () => {
    // given the issues array
    component.issues = [issue, issue2];

    // given the "updateIssue()" method
    spyOn(component, 'updateIssue');

    // when "onSaveIssue()" is called and the issues array contains the issue
    component.onSaveIssue(issue);

    // then "updateIssue()" should be called
    expect(component.updateIssue).toHaveBeenCalledWith(issue);
  });
});
