import { asNativeElements } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import IssueResolution from 'src/app/models/enums/issue-resolution';
import IssueStatus from 'src/app/models/enums/issue-status';
import IssueType from 'src/app/models/enums/issue-type';
import { Issue } from 'src/app/models/issue';

import { IssueDetailsComponent } from './issue-details.component';

describe('IssueDetailsComponent', () => {
  let component: IssueDetailsComponent;
  let fixture: ComponentFixture<IssueDetailsComponent>;
  let nativeElement: HTMLElement;

  let issueDetails: Issue;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IssueDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueDetailsComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

    fixture.detectChanges();

    // set up issue details
    issueDetails = {
      key: 'Dh85m',
      description: 'Issue description',
      summary: 'Issue summary',
      type: IssueType.Task,
      status: IssueStatus.Todo,
      resolution: IssueResolution.Unresolved,
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render issue details', () => {
    // given issue details
    component.details = issueDetails;

    fixture.detectChanges();

    // expect all the details to be rendered
    expect(nativeElement.querySelector('div#description').textContent).toEqual(
      issueDetails.description
    );
    expect(nativeElement.querySelector('div#summary').textContent).toEqual(
      issueDetails.summary
    );
    expect(nativeElement.querySelector('div#type').textContent).toEqual(
      issueDetails.type
    );
    expect(nativeElement.querySelector('div#status').textContent).toEqual(
      issueDetails.status
    );
    expect(nativeElement.querySelector('div#resolution').textContent).toEqual(
      issueDetails.resolution
    );
    expect(nativeElement.querySelector('div#assignee').textContent).toEqual(
      issueDetails.assignee
    );
    expect(nativeElement.querySelector('div#reporter').textContent).toEqual(
      issueDetails.reporter
    );
    expect(nativeElement.querySelector('div#comments').textContent).toEqual(
      issueDetails.comments.toString()
    );
    expect(nativeElement.querySelector('div#votes').textContent).toEqual(
      issueDetails.votes.toString()
    );
    expect(nativeElement.querySelector('div#watchers').textContent).toEqual(
      issueDetails.watchers.toString()
    );
    expect(nativeElement.querySelector('div#created').textContent).toContain(
      issueDetails.created.toDateString()
    );
    expect(nativeElement.querySelector('div#updated').textContent).toContain(
      issueDetails.updated.toDateString()
    );
    expect(nativeElement.querySelector('div#estimate').textContent).toContain(
      issueDetails.estimate.toDateString()
    );
  });
});
