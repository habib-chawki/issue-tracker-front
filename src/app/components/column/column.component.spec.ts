import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssuesComponent } from '../issues/issues.component';

import { ColumnComponent } from './column.component';

describe('ColumnComponent', () => {
  let component: ColumnComponent;
  let fixture: ComponentFixture<ColumnComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColumnComponent, IssuesComponent],
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

  fit('should render a list of issues', () => {
    expect(nativeElement.querySelector('app-issues')).toBeTruthy();
  });
});
