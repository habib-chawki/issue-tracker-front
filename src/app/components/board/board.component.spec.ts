import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssueBuilder } from 'src/app/models/issue-builder/issue-builder';
import { ColumnComponent } from '../column/column.component';
import { IssueComponent } from '../issue/issue.component';
import { IssuesComponent } from '../issues/issues.component';

import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BoardComponent,
        ColumnComponent,
        IssuesComponent,
        IssueComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;

    nativeElement = fixture.nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should render a list of columns', () => {
    // nothing should be rendered at first
    expect(nativeElement.querySelectorAll('app-colum').length).toBe(0);

    // given the list of columns
    component.columns = [
      {
        title: 'To do',
        issues: [
          new IssueBuilder().id('100').build(),
          new IssueBuilder().id('200').build(),
        ],
      },
      {
        title: 'In progress',
        issues: [new IssueBuilder().id('300').build()],
      },
      {
        title: 'Done',
        issues: [new IssueBuilder().id('400').build()],
      },
    ];

    fixture.detectChanges();

    // the columns should all be rendered
    expect(nativeElement.querySelectorAll('app-column').length).toBe(
      component.columns.length
    );
  });
});
