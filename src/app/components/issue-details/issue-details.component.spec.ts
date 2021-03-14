import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentBuilder } from 'src/app/models/comment-builder/comment-builder';
import IssuePriority from 'src/app/models/enums/issue-priority';
import IssueResolution from 'src/app/models/enums/issue-resolution';
import IssueStatus from 'src/app/models/enums/issue-status';
import IssueType from 'src/app/models/enums/issue-type';
import { Issue } from 'src/app/models/issue/issue';
import { UserBuilder } from 'src/app/models/user-builder/user-builder';
import { IssueIntercomService } from 'src/app/services/issue-intercom/issue-intercom.service';
import { CommentComponent } from '../comment/comment.component';
import { CommentsComponent } from '../comments/comments.component';

import { IssueDetailsComponent } from './issue-details.component';

describe('IssueDetailsComponent', () => {
  let component: IssueDetailsComponent;
  let fixture: ComponentFixture<IssueDetailsComponent>;
  let nativeElement: HTMLElement;

  let issueCommunicationService: IssueIntercomService;

  let issue: Issue;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IssueDetailsComponent,
        CommentsComponent,
        CommentComponent,
      ],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueDetailsComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

    fixture.detectChanges();

    issueCommunicationService = TestBed.inject(IssueIntercomService);

    // set up issue details
    issue = {
      id: '1',
      key: 'Dh85m',
      description: 'Issue description',
      summary: 'Issue summary',
      priority: IssuePriority.HIGH,
      type: IssueType.TASK,
      status: IssueStatus.TODO,
      resolution: IssueResolution.UNRESOLVED,
      assignee: new UserBuilder().username('assignee@issue').build(),
      reporter: new UserBuilder().username('reporter@issue').build(),
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a label for each issue detail', () => {
    expect(
      nativeElement.querySelector('label[for="description"]').textContent
    ).toContain('Description');

    expect(
      nativeElement.querySelector('label[for="summary"]').textContent
    ).toContain('Summary');

    expect(
      nativeElement.querySelector('label[for="type"]').textContent
    ).toContain('Type');

    expect(
      nativeElement.querySelector('label[for="status"]').textContent
    ).toContain('Status');

    expect(
      nativeElement.querySelector('label[for="resolution"]').textContent
    ).toContain('Resolution');

    expect(
      nativeElement.querySelector('label[for="assignee"]').textContent
    ).toContain('Assignee');

    expect(
      nativeElement.querySelector('label[for="reporter"]').textContent
    ).toContain('Reporter');

    expect(
      nativeElement.querySelector('label[for="votes"]').textContent
    ).toContain('Votes');

    expect(
      nativeElement.querySelector('label[for="comments"]').textContent
    ).toContain('Comments');

    expect(
      nativeElement.querySelector('label[for="watchers"]').textContent
    ).toContain('Watchers');

    expect(
      nativeElement.querySelector('label[for="created"]').textContent
    ).toContain('Created');

    expect(
      nativeElement.querySelector('label[for="updated"]').textContent
    ).toContain('Updated');

    expect(
      nativeElement.querySelector('label[for="estimate"]').textContent
    ).toContain('Estimated time');
  });

  it('should render each issue detail', () => {
    // given the issue details
    component.issue = issue;

    // when changes are detected
    fixture.detectChanges();

    // then all the issue details should be rendered
    expect(nativeElement.querySelector('div#description').textContent).toEqual(
      issue.description
    );

    expect(nativeElement.querySelector('div#summary').textContent).toEqual(
      issue.summary
    );

    expect(nativeElement.querySelector('div#type').textContent).toEqual(
      issue.type
    );

    expect(nativeElement.querySelector('div#status').textContent).toEqual(
      issue.status
    );

    expect(nativeElement.querySelector('div#resolution').textContent).toEqual(
      issue.resolution
    );

    expect(nativeElement.querySelector('div#assignee').textContent).toEqual(
      issue.assignee.username
    );

    expect(nativeElement.querySelector('div#reporter').textContent).toEqual(
      issue.reporter.username
    );

    expect(nativeElement.querySelector('div#votes').textContent).toContain(
      issue.votes.toString()
    );

    // dates should be rendered
    expect(nativeElement.querySelector('div#created').textContent).toContain(
      issue.creationTime.toDateString()
    );

    expect(nativeElement.querySelector('div#updated').textContent).toContain(
      issue.updateTime.toDateString()
    );

    expect(nativeElement.querySelector('div#estimate').textContent).toContain(
      issue.estimate.toDateString()
    );

    // the list of watchers should be rendered
    const watchersList = [];
    nativeElement
      .querySelectorAll('div#watchers ul li')
      .forEach((watcher) => watchersList.push(watcher.textContent));

    expect(watchersList).toEqual(issue.watchers);
  });

  it('should render a list of comments', () => {
    // given the issue details
    component.issue = issue;
    fixture.detectChanges();

    // the app-comments component should be rendered (list of comments)
    expect(nativeElement.querySelector('app-comments')).toBeTruthy();
  });

  it('should render a "close" button to hide the issue details component', () => {
    expect(nativeElement.querySelector('button#close').textContent).toContain(
      'Close'
    );
  });

  // it('should invoke the "onClose()" handler method when the "Close" button is clicked', () => {
  //   // given the onClose() handler method
  //   spyOn(component, 'onClose');

  //   // given the Close button
  //   const closeButton: HTMLButtonElement = nativeElement.querySelector(
  //     'button#close'
  //   );

  //   // when the button is clicked
  //   closeButton.click();

  //   // then onClose() should be called
  //   expect(component.onClose).toHaveBeenCalled();
  // });

  // it('should emit an "issueDetailsClosed" event when "onClose()" is called', () => {
  //   // given the "issueDetailsClosed" event emitter
  //   spyOn(component.issueDetailsClosed, 'emit');

  //   // when "onClose()" is called
  //   component.onClose();

  //   // then an "issueDetailsClosed" event should be emitted
  //   expect(component.issueDetailsClosed.emit).toHaveBeenCalled();
  // });
});
