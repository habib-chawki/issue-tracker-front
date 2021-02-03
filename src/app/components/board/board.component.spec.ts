import { DragDropModule } from '@angular/cdk/drag-drop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IssueBuilder } from 'src/app/models/issue-builder/issue-builder';
import { ColumnFormComponent } from '../column-form/column-form.component';
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
        ColumnFormComponent,
      ],
      imports: [DragDropModule, ReactiveFormsModule],
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

  it('should render a list of columns', () => {
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

  it('should render "Add column" button', () => {
    expect(nativeElement.querySelector('button#add').textContent).toBe(
      'Add column'
    );
  });

  it('should invoke "onDisplayColumnForm()" when "Add column" button is clicked', () => {
    // given the onDisplayColumnForm() handler method
    spyOn(component, 'onDisplayColumnForm');

    // given the add column button
    const addButton: HTMLButtonElement = nativeElement.querySelector(
      'button#add'
    );

    // when the button is clicked
    addButton.click();

    // then expect "onDisplayColumnForm()" to be invoked
    expect(component.onDisplayColumnForm).toHaveBeenCalled();
  });

  it('should display the column form when "onDisplayColumnForm()" is invoked', () => {
    // column form component should not be rendered at first
    expect(nativeElement.querySelector('app-column-form')).toBeFalsy();

    // when "onDisplayColumnForm()" is called
    component.onDisplayColumnForm();
    fixture.detectChanges();

    // then expect the form component to be displayed
    expect(nativeElement.querySelector('app-column-form')).toBeTruthy();
  });

  it('should invoke "onColumnFormCancelled()" when a "columnFormCancelled" event is triggered', () => {
    // given the form column component is displayed
    component.willDisplayColumnForm = true;
    fixture.detectChanges();

    // given "onColumnFormCancelled()" handler method
    spyOn(component, 'onColumnFormCancelled');

    // when the ColumnForm component emits a "columnFormCancelled" event
    const columnForm = fixture.debugElement.query(By.css('app-column-form'));

    columnForm.triggerEventHandler('columnFormCancelled', null);

    // then expect "onColumnFormCancelled()" to be invoked
    expect(component.onColumnFormCancelled).toHaveBeenCalled();
  });

  it('should hide column form when "onColumnFormCancelled()" is invoked', () => {
    // given the column form should be displayed at first
    component.willDisplayColumnForm = true;
    fixture.detectChanges();

    expect(nativeElement.querySelector('app-column-form')).toBeTruthy();

    // when "onColumnFormCancelled()" is invoked
    component.onColumnFormCancelled();
    fixture.detectChanges();

    // then the column form should be hidden
    expect(nativeElement.querySelector('app-column-form')).toBeFalsy();
  });

  fit('should invoke "onColumnFormSaved()" when columnFormSaved event is triggered', () => {
    // given the column form should be displayed at first
    component.willDisplayColumnForm = true;
    fixture.detectChanges();

    // given the column form saved handler method
    spyOn(component, 'onColumnFormSaved');

    // given the column form value
    const columnFormValue = {
      title: 'some title',
    };

    // when the ColumnForm component emits a "columnFormSaved" event with the form value
    const columnForm = fixture.debugElement.query(By.css('app-column-form'));
    columnForm.triggerEventHandler('columnFormSaved', columnFormValue);

    // then the onColumnSaved handler method should be called with the form value
    expect(component.onColumnFormSaved).toHaveBeenCalledWith(columnFormValue);
  });
});
