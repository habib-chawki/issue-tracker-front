import { ComponentFixture, TestBed } from '@angular/core/testing';

import IssueType from 'src/app/models/enums/issue-type';
import { IssueBuilder } from 'src/app/models/issue-builder/issue-builder';

import { Issue } from 'src/app/models/issue/issue';
import { UserBuilder } from 'src/app/models/user-builder/user-builder';
import { User } from 'src/app/models/user/user';
import { StorageService } from 'src/app/services/storage/storage.service';

import { IssueComponent } from './issue.component';

describe('IssueComponent', () => {
  let component: IssueComponent;
  let fixture: ComponentFixture<IssueComponent>;
  let nativeElement: HTMLElement;

  let issue: Issue;
  let reporter: User;

  let storageService: StorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IssueComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

    fixture.detectChanges();

    storageService = TestBed.inject(StorageService);

    // set up the issue reporter
    reporter = new UserBuilder()
      .id('100')
      .email('issue.reporter@email.com')
      .build();

    // set up an issue
    issue = new IssueBuilder()
      .id('1')
      .type(IssueType.Bug)
      .summary('issue summary')
      .reporter(reporter)
      .build();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render issue details', () => {
    // issue details should be empty at first
    expect(nativeElement.querySelector('div div#type').textContent).toBe('');
    expect(nativeElement.querySelector('div div#summary').textContent).toBe('');

    // given issue details
    component.issue = issue;
    fixture.detectChanges();

    // expect the issue type to be rendered
    expect(nativeElement.querySelector('div div#type').textContent).toEqual(
      issue.type
    );

    // expect the issue summary to be rendered
    expect(nativeElement.querySelector('div div#summary').textContent).toEqual(
      issue.summary
    );
  });

  it('should invoke "onClick()" handler when issue element is clicked', () => {
    spyOn(component, 'onClick');

    // given the issue template element
    const issue = nativeElement.querySelector('div');

    // when it is clicked
    issue.click();

    // then the "onClick()" handler should be invoked
    expect(component.onClick).toHaveBeenCalled();
  });

  it('should emit an "issueClicked" event with issue details when "onClick()" is invoked', () => {
    // given an issue
    component.issue = issue;

    spyOn(component.issueClicked, 'emit');

    // when the "onClick()" event handler method is invoked
    component.onClick();

    // then an event should be emitted with the issue details
    expect(component.issueClicked.emit).toHaveBeenCalledWith(component.issue);
  });

  it('should allow issue modification when the logged-in user is the issue reporter', () => {
    // given an issue
    component.issue = issue;

    // when the logged-in user is the reporter
    spyOn(storageService, 'isUserLoggedIn').and.returnValue(true);
    spyOn(storageService, 'getUserIdentifier').and.returnValue(
      issue.reporter.id
    );

    // then it should return true (can modify issue)
    expect(component.canModify()).toBeTrue();
  });

  it('should disallow issue modification when the logged-in user is not the issue reporter', () => {
    // given an issue
    component.issue = issue;

    // when the logged-in user is not the reporter
    spyOn(storageService, 'isUserLoggedIn').and.returnValue(true);
    spyOn(storageService, 'getUserIdentifier').and.returnValue('403');

    // then it should return false (can not modify issue)
    expect(component.canModify()).toBeFalse();
  });

  it('should render the remove button when the logged-in user is the issue reporter', () => {
    // given an issue details
    component.issue = issue;

    // when the user is logged-in and is the issue reporter
    spyOn(storageService, 'isUserLoggedIn').and.returnValue(true);
    spyOn(storageService, 'getUserIdentifier').and.returnValue(
      issue.reporter.id
    );

    // detect changes after "canModify()" is called
    fixture.detectChanges();

    // the remove button should be rendered
    expect(nativeElement.querySelector('button#remove')).toBeTruthy();
    expect(nativeElement.querySelector('button#remove').textContent).toContain(
      'Remove'
    );
  });

  it('should not render the remove button when the logged-in user is not the issue reporter', () => {
    // given an issue details
    component.issue = issue;

    // when the user is logged-in but not the issue reporter
    spyOn(storageService, 'isUserLoggedIn').and.returnValue(true);
    spyOn(storageService, 'getUserIdentifier').and.returnValue('401');

    // detect changes after "canModify()" is called
    fixture.detectChanges();

    // the remove button should not be rendered
    expect(nativeElement.querySelector('button#remove')).toBeFalsy();
  });

  it('should invoke "onRemove()" handler when remove button is clicked', () => {
    // given the logged-in user is the issue reporter
    spyOn(component, 'canModify').and.returnValue(true);

    // given the remove issue handler method
    spyOn(component, 'onRemove');

    fixture.detectChanges();

    // given the remove issue button
    const removeButton: HTMLButtonElement = nativeElement.querySelector(
      'button#remove'
    );

    // when the button is clicked
    removeButton.click();

    // then onRemove handler should be invoked
    expect(component.onRemove).toHaveBeenCalled();
  });

  it('should emit "issueRemoved" event when "onRemove()" is called', () => {
    // given an issue
    component.issue = issue;

    spyOn(component.issueRemoved, 'emit');

    // when onRemove is invoked
    component.onRemove();

    // then an "issueRemoved" event should be emitted
    expect(component.issueRemoved.emit).toHaveBeenCalledWith(component.issue);
  });

  it('should render the update button when the logged-in user is the reporter', () => {
    // given the issue
    component.issue = issue;

    // when the logged-in user is the issue reporter
    spyOn(storageService, 'isUserLoggedIn').and.returnValue(true);
    spyOn(storageService, 'getUserIdentifier').and.returnValue(
      issue.reporter.id
    );

    // detect changes after "canModify()" is called
    fixture.detectChanges();

    // then the update issue button should be rendered
    expect(nativeElement.querySelector('button#update')).toBeTruthy();
    expect(nativeElement.querySelector('button#update').textContent).toContain(
      'Update'
    );
  });

  it('should not render the update button when the logged-in user is not the reporter', () => {
    // given the issue
    component.issue = issue;

    // when the logged-in user is not the issue reporter
    spyOn(storageService, 'isUserLoggedIn').and.returnValue(true);
    spyOn(storageService, 'getUserIdentifier').and.returnValue('401');

    // detect changes after "canModify()" is called
    fixture.detectChanges();

    // then the update issue button should not be rendered
    expect(nativeElement.querySelector('button#update')).toBeFalsy();
  });
});
