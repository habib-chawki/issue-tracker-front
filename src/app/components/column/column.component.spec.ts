import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssueBuilder } from 'src/app/models/issue-builder/issue-builder';
import { IssueComponent } from '../issue/issue.component';
import { IssuesComponent } from '../issues/issues.component';

import { ColumnComponent } from './column.component';

describe('ColumnComponent', () => {
  let component: ColumnComponent;
  let fixture: ComponentFixture<ColumnComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColumnComponent, IssuesComponent, IssueComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a title', () => {
    // given a title
    component.title = 'Column title';

    fixture.detectChanges();

    expect(nativeElement.querySelector('div#title').textContent).toBe(
      component.title
    );
  });

  it('should render a list of issues', () => {
    // given the list of issues
    component.issues = [
      new IssueBuilder()
        .id('100')
        .summary('issue 1 summary')
        .estimate(new Date())
        .build(),

      new IssueBuilder()
        .id('200')
        .summary('issue 2 summary')
        .estimate(new Date())
        .build(),
    ];

    fixture.detectChanges();

    // all issues should be rendered
    expect(nativeElement.querySelectorAll('app-issue').length).toBe(
      component.issues.length
    );
  });
});
