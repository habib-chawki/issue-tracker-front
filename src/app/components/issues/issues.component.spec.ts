import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommentBuilder } from 'src/app/models/comment-builder/comment-builder';
import IssuePriority from 'src/app/models/enums/issue-priority';
import IssueResolution from 'src/app/models/enums/issue-resolution';
import IssueStatus from 'src/app/models/enums/issue-status';
import IssueType from 'src/app/models/enums/issue-type';
import { Issue } from 'src/app/models/issue/issue';
import { UserBuilder } from 'src/app/models/user-builder/user-builder';
import { CommentComponent } from '../comment/comment.component';
import { CommentsComponent } from '../comments/comments.component';
import { IssueDetailsComponent } from '../issue-details/issue-details.component';
import { IssueComponent } from '../issue/issue.component';

import { IssuesComponent } from './issues.component';

describe('IssuesComponent', () => {
  let component: IssuesComponent;
  let fixture: ComponentFixture<IssuesComponent>;
  let nativeElement: HTMLElement;

  let issue: Issue, issue2: Issue;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IssuesComponent,
        IssueComponent,
        IssueDetailsComponent,
        CommentsComponent,
        CommentComponent,
      ],
      imports: [HttpClientTestingModule, DragDropModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

    fixture.detectChanges();

    // set up an issue with details
    issue = {
      id: '1',
      key: 'Dh85m',
      description: 'Issue description',
      summary: 'Issue summary',
      priority: IssuePriority.low,
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
      priority: IssuePriority.high,
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

    it('should invoke "onRemoveIssue()" when an "issueRemoved" event is triggered', () => {
      // given the onRemoveIssue handler method
      spyOn(component, 'onRemoveIssue');

      // given an issue component
      component.issues.push(issue);
      fixture.detectChanges();

      // when the app-issue component emits an "issueRemoved" event
      const issueElement: DebugElement = fixture.debugElement.query(
        By.css('app-issue')
      );
      issueElement.triggerEventHandler('issueRemoved', issue);

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

  describe('IssueDetailsComponent', () => {
    it('should invoke "onDisplayIssueDetails()" when an issue emits an "issueClicked" event', () => {
      spyOn(component, 'onDisplayIssueDetails');

      // given an issue
      component.issues.push(issue);
      fixture.detectChanges();

      // when the issue is clicked
      const issueElement: DebugElement = fixture.debugElement.query(
        By.css('app-issue')
      );
      issueElement.triggerEventHandler('issueClicked', issue);

      // then the "onDisplayIssueDetails()" event handler should be invoked with the issue details
      expect(component.onDisplayIssueDetails).toHaveBeenCalledWith(issue);
    });

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

    // it('should invoke "onHideIssueDetails()" when an "issueDetailsClosed" event is emitted', () => {
    //   // given an issue details
    //   component.issueDetails = issue;

    //   // given an "issueDetails" component
    //   component.willDisplayIssueDetails = true;
    //   fixture.detectChanges();

    //   spyOn(component, 'onHideIssueDetails');

    //   // when the "issueDetailsComponent" emits and "issueDetailsClosed" event
    //   const issueDetailsElement: DebugElement = fixture.debugElement.query(
    //     By.css('app-issue-details')
    //   );
    //   issueDetailsElement.triggerEventHandler('issueDetailsClosed', true);

    //   // then "onHideIssueDetails()" should be called
    //   expect(component.onHideIssueDetails).toHaveBeenCalled();
    // });

    // it('should toggle "willDisplayIssueDetails" value', () => {
    //   // should set to true
    //   component.onDisplayIssueDetails(issue);
    //   expect(component.willDisplayIssueDetails).toBeTrue();

    //   // should set to false
    //   component.onHideIssueDetails();
    //   expect(component.willDisplayIssueDetails).toBeFalse();
    // });
  });

  it('should invoke "onDrop()" when an "cdkDropListDropped" event is emitted', () => {
    // given the "onDrop()" handler method
    spyOn(component, 'onDrop');

    // given the issues drop list
    const dropList = nativeElement.querySelector('div#drop-list');

    // when an "cdkDropListDropped" event is emitted
    dropList.dispatchEvent(new Event('cdkDropListDropped'));

    // then "onDrop()" should be called
    expect(component.onDrop).toHaveBeenCalled();
  });
});
