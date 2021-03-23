import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CommentBuilder } from 'src/app/models/comment-builder/comment-builder';
import IssuePriority from 'src/app/models/enums/issue-priority';

import IssueStatus from 'src/app/models/enums/issue-status';
import IssueType from 'src/app/models/enums/issue-type';

import { Issue } from 'src/app/models/issue/issue';
import { UserBuilder } from 'src/app/models/user-builder/user-builder';
import { IssueIntercomService } from 'src/app/services/issue-intercom/issue-intercom.service';
import { IssueService } from 'src/app/services/issue/issue.service';

import { IssueFormComponent } from '../../forms/issue-form/issue-form.component';
import { IssuesComponent } from '../issues/issues.component';
import { BacklogComponent } from './backlog.component';

describe('Backlog', () => {
  let component: BacklogComponent;
  let fixture: ComponentFixture<BacklogComponent>;
  let nativeElement: HTMLElement;

  let issueService: IssueService;
  let issueCommunicationService: IssueIntercomService;

  let issue: Issue, issue2: Issue;

  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BacklogComponent, IssueFormComponent, IssuesComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        DragDropModule,
        MatDialogModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

    fixture.detectChanges();

    issueService = TestBed.inject(IssueService);
    issueCommunicationService = TestBed.inject(IssueIntercomService);

    dialog = TestBed.inject(MatDialog);

    // set up an issue with details
    issue = {
      id: '1',
      key: 'Dh85m',
      description: 'Issue description',
      summary: 'Issue summary',
      priority: IssuePriority.MEDIUM,
      type: IssueType.BUG,
      status: IssueStatus.RESOLVED,
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
      priority: IssuePriority.LOW,
      type: IssueType.STORY,
      status: IssueStatus.UNRESOLVED,
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
    expect(addIssueButton.textContent).toContain('Add issue');
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

    it('should open "IssueFormComponent" dialog when "onDisplayIssueForm()" is called', () => {
      spyOn(dialog, 'open');

      component.onDisplayIssueForm();

      // expect the issue form dialog to be opened
      expect(dialog.open).toHaveBeenCalledWith(IssueFormComponent, {
        data: {},
      });
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
      // given
      spyOn(issueCommunicationService.issueUpdate$, 'subscribe');

      // when
      component.ngOnInit();

      // then
      expect(
        issueCommunicationService.issueUpdate$.subscribe
      ).toHaveBeenCalled();
    });

    // it('should invoke "handleIssueUpdate()" when an issue update is announced', () => {
    //   spyOn(component, 'handleIssueUpdate');

    //   // when component is initialized
    //   component.ngOnInit();

    //   // when an issue update is announced
    //   issueCommunicationService.announceIssueUpdate(issue);

    //   // then handleIssueUpdate() should be called
    //   expect(component.handleIssueUpdate).toHaveBeenCalledWith(issue);
    // });

    it('should subscribe to "issueFormSaved$" observable in "ngOnInit()"', () => {
      // given
      spyOn(issueCommunicationService.issueFormSaved$, 'subscribe');

      // when
      component.ngOnInit();

      // then
      expect(
        issueCommunicationService.issueFormSaved$.subscribe
      ).toHaveBeenCalled();
    });

    it('should invoke "onSaveIssue()" when an issue form saved is announced', () => {
      spyOn(component, 'onSaveIssue');

      // when component is initialized
      component.ngOnInit();

      // when an issue form saved is announced
      issueCommunicationService.announceIssueFormSaved(issue);

      // then expect the "onSaveIssue()" event handler to have been called
      expect(component.onSaveIssue).toHaveBeenCalledWith(issue);
    });

    // it('should set the initial form value when "handleIssueUpdate()" is called', () => {
    //   spyOn(component, 'onDisplayIssueForm').and.stub();

    //   // when "handleIssueUpdate()" is called
    //   component.handleIssueUpdate(issue2);

    //   // then the form value should be set
    //   expect(component.initialIssueFormValue).toEqual(issue2);
    // });

    // it('should open the "issueFormComponent" dialog with the initial form value when "handleIssueUpdate()" is called', () => {
    //   spyOn(dialog, 'open');

    //   // when "handleIssueUpdate()" is called
    //   component.handleIssueUpdate(issue2);

    //   // then "issueFormComponent" dialog should be opened
    //   expect(dialog.open).toHaveBeenCalledWith(IssueFormComponent, {
    //     data: issue2,
    //   });
    // });
  });

  it('should add the new issue to the "issues" array when "createIssue()" is invoked', () => {
    spyOn(issueService, 'createIssue').and.returnValue(of(issue));

    // when 'createIssue()' is called
    component.createIssue(issue);

    // then the new issue should be added to the issues array
    expect(component.backlog).toContain(issue);
  });

  it('should update the issue in the "issues" array when "updateIssue()" is invoked', () => {
    // given the issues array
    component.backlog = [issue, issue2];

    // given the issue is updated
    const updatedIssue = {
      ...issue,
      description: 'Some new updated description',
      status: IssueStatus.IN_PROGRESS,
    };

    spyOn(issueService, 'updateIssue').and.returnValue(of(updatedIssue));

    // when "updateIssue()" is called
    component.updateIssue(updatedIssue);

    // then the issue in the issues array should be updated
    expect(component.backlog).toContain(updatedIssue);
    expect(component.backlog).not.toContain(issue);
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
    component.backlog = [issue, issue2];

    // given the "updateIssue()" method
    spyOn(component, 'updateIssue');

    // when "onSaveIssue()" is called and the issues array contains the issue
    component.onSaveIssue(issue);

    // then "updateIssue()" should be called
    expect(component.updateIssue).toHaveBeenCalledWith(issue);
  });
});
