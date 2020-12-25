import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of, Subscription } from 'rxjs';
import { CommentBuilder } from 'src/app/models/comment-builder/comment-builder';
import IssueResolution from 'src/app/models/enums/issue-resolution';
import IssueStatus from 'src/app/models/enums/issue-status';
import IssueType from 'src/app/models/enums/issue-type';
import { Issue } from 'src/app/models/issue/issue';
import { UserBuilder } from 'src/app/models/user-builder/user-builder';
import { IssueCommunicationService } from 'src/app/services/issue-communication/issue-communication.service';
import { CommentComponent } from '../comment/comment.component';
import { CommentsComponent } from '../comments/comments.component';

import { IssueDetailsComponent } from './issue-details.component';

describe('IssueDetailsComponent', () => {
  let component: IssueDetailsComponent;
  let fixture: ComponentFixture<IssueDetailsComponent>;
  let nativeElement: HTMLElement;

  let issueCommunicationService: IssueCommunicationService;

  let issue: Issue;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IssueDetailsComponent,
        CommentsComponent,
        CommentComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueDetailsComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

    fixture.detectChanges();

    issueCommunicationService = TestBed.inject(IssueCommunicationService);

    // set up issue details
    issue = {
      id: '1',
      key: 'Dh85m',
      description: 'Issue description',
      summary: 'Issue summary',
      type: IssueType.Task,
      status: IssueStatus.Todo,
      resolution: IssueResolution.Unresolved,
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

  it('should subscribe to "issueCommunicationService", listening for "issueClicked" events', () => {
    spyOn(issueCommunicationService.issueClicked, 'subscribe');

    // when ngOnInit is called (component mounts for the first time)
    component.ngOnInit();

    // then we should subscribe to the issueClicked event emitter
    expect(issueCommunicationService.issueClicked.subscribe).toHaveBeenCalled();
  });

  it('should set the issue to the value of the "issueClicked.subscribe" response', () => {
    // when an issueClicked is announced
    issueCommunicationService.announceIssueClicked(issue);

    // then the component's issue property should be set
    expect(component.issue).toBe(issue);
  });
});
