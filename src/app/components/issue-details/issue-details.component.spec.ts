import { asNativeElements } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
      type: 'Story',
      status: 'Todo',
      resolution: 'Done',
      assignee: 'Me',
      reporter: 'Someone',
      commnets: ['comment1', 'comment2'],
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

  fit('should render issue details', () => {
    // expect the rendered details to be empty at first
    expect(nativeElement.querySelector('div#description').textContent).toEqual(
      ''
    );
    expect(nativeElement.querySelector('div#summary').textContent).toEqual('');
    expect(nativeElement.querySelector('div#type').textContent).toEqual('');
    expect(nativeElement.querySelector('div#status').textContent).toEqual('');
    expect(nativeElement.querySelector('div#resolution').textContent).toEqual(
      ''
    );
    expect(nativeElement.querySelector('div#assignee').textContent).toEqual('');
    expect(nativeElement.querySelector('div#reporter').textContent).toEqual('');
    expect(nativeElement.querySelector('div#comments').textContent).toEqual('');
    expect(nativeElement.querySelector('div#votes').textContent).toEqual('');
    expect(nativeElement.querySelector('div#watchers').textContent).toEqual('');
    expect(nativeElement.querySelector('div#created').textContent).toEqual('');
    expect(nativeElement.querySelector('div#updated').textContent).toEqual('');
    expect(nativeElement.querySelector('div#estimate').textContent).toEqual('');

    // // when details are updated
    // const details = 'Issue details';
    // component.details = details;

    // fixture.detectChanges();

    // // then the updated details should be rendered
    // expect(nativeElement.querySelector('div').textContent).toEqual(details);
  });
});
