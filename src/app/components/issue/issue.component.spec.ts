import { ComponentFixture, TestBed } from '@angular/core/testing';

import IssueResolution from 'src/app/models/enums/issue-resolution';
import IssueStatus from 'src/app/models/enums/issue-status';
import IssueType from 'src/app/models/enums/issue-type';

import { Issue } from 'src/app/models/issue';

import { IssueComponent } from './issue.component';

describe('IssueComponent', () => {
  let component: IssueComponent;
  let fixture: ComponentFixture<IssueComponent>;
  let nativeElement: HTMLElement;

  let issue: Issue;

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

    // set up an issue
    issue = {
      id: '1',
      key: 'Dh85m',
      description: 'Issue description',
      summary: 'Issue summary',
      type: IssueType.Story,
      status: IssueStatus.Todo,
      resolution: IssueResolution.Done,
      assignee: 'Me',
      reporter: 'Someone',
      comments: ['comment1', 'comment2'],
      votes: 8,
      watchers: ['jon', 'jane'],
      created: new Date(),
      updated: new Date(),
      estimate: new Date(),
    };
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render issue details', () => {
    // issue details should be empty at first
    expect(nativeElement.querySelector('div div#type').textContent).toBe('');
    expect(nativeElement.querySelector('div div#description').textContent).toBe(
      ''
    );

    // given issue details
    component.issue = issue;
    fixture.detectChanges();

    // expect issue type to be rendered
    expect(nativeElement.querySelector('div div#type').textContent).toEqual(
      issue.type
    );

    // expect issue description to be rendered
    expect(
      nativeElement.querySelector('div div#description').textContent
    ).toEqual(issue.description);
  });

  it('should invoke "onClick()" handler when issue element is clicked', () => {
    spyOn(component, 'onClick');

    // given the issue template element
    const issue = nativeElement.querySelector('div');

    // when it is clicked
    issue.click();

    // then expect the onClick handler to be invoked
    expect(component.onClick).toHaveBeenCalled();
  });

  it('should emit an "issueClicked" event with issue details when "onClick()" is invoked', () => {
    spyOn(component.issueClicked, 'emit');

    // when onClick event handler is invoked
    component.onClick();

    // then expect an event to be emitted with issue details
    expect(component.issueClicked.emit).toHaveBeenCalledWith(component.issue);
  });
});
