import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import Board from 'src/app/models/board/board';
import Column from 'src/app/models/column/column';
import { IssueBuilder } from 'src/app/models/issue-builder/issue-builder';
import { ColumnService } from 'src/app/services/column/column.service';
import { ColumnFormComponent } from '../../forms/column-form/column-form.component';
import { ColumnComponent } from '../column/column.component';
import { IssueComponent } from '../issue/issue.component';
import { IssuesComponent } from '../issues/issues.component';

import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let nativeElement: HTMLElement;

  let board: Board;
  let column: Column;
  let columnService: ColumnService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BoardComponent,
        ColumnComponent,
        IssuesComponent,
        IssueComponent,
        ColumnFormComponent,
      ],
      imports: [DragDropModule, ReactiveFormsModule, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;

    nativeElement = fixture.nativeElement;

    columnService = TestBed.inject(ColumnService);

    fixture.detectChanges();

    board = {
      id: '100',
      name: 'scrum board',
      columns: [
        {
          id: '1',
          title: 'To do',
          issues: [
            new IssueBuilder().id('100').build(),
            new IssueBuilder().id('200').build(),
          ],
        },
        {
          id: '2',
          title: 'In progress',
          issues: [new IssueBuilder().id('300').build()],
        },
        {
          id: '3',
          title: 'Done',
          issues: [new IssueBuilder().id('400').build()],
        },
      ],
    };

    column = {
      id: '4',
      title: 'Done',
      issues: [],
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a list of columns', () => {
    // nothing should be rendered at first
    expect(nativeElement.querySelectorAll('app-colum').length).toBe(0);

    // given the list of columns
    component.board = board;

    fixture.detectChanges();

    // the columns should all be rendered
    expect(nativeElement.querySelectorAll('app-column').length).toBe(
      component.board.columns.length
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

  // it('should invoke "onColumnFormCancelled()" when a "columnFormCancelled" event is triggered', () => {
  //   // given the form column component is displayed
  //   component.willDisplayColumnForm = true;
  //   fixture.detectChanges();

  //   // given "onColumnFormCancelled()" handler method
  //   spyOn(component, 'onColumnFormCancelled');

  //   // when the ColumnForm component emits a "columnFormCancelled" event
  //   const columnForm = fixture.debugElement.query(By.css('app-column-form'));

  //   columnForm.triggerEventHandler('columnFormCancelled', null);

  //   // then expect "onColumnFormCancelled()" to be invoked
  //   expect(component.onColumnFormCancelled).toHaveBeenCalled();
  // });

  // it('should hide column form when "onColumnFormCancelled()" is invoked', () => {
  //   // given the column form should be displayed at first
  //   component.willDisplayColumnForm = true;
  //   fixture.detectChanges();

  //   expect(nativeElement.querySelector('app-column-form')).toBeTruthy();

  //   // when "onColumnFormCancelled()" is invoked
  //   component.onColumnFormCancelled();
  //   fixture.detectChanges();

  //   // then the column form should be hidden
  //   expect(nativeElement.querySelector('app-column-form')).toBeFalsy();
  // });

  // it('should invoke "onColumnFormSaved()" when columnFormSaved event is triggered', () => {
  //   // given the column form
  //   component.willDisplayColumnForm = true;
  //   fixture.detectChanges();

  //   // given the column form saved handler method
  //   spyOn(component, 'onColumnFormSaved');

  //   // given the column form value
  //   const columnFormValue = {
  //     title: 'some title',
  //   };

  //   // when the ColumnForm component emits a "columnFormSaved" event with the form value
  //   const columnForm = fixture.debugElement.query(By.css('app-column-form'));
  //   columnForm.triggerEventHandler('columnFormSaved', columnFormValue);

  //   // then the onColumnSaved handler method should be called with the form value
  //   expect(component.onColumnFormSaved).toHaveBeenCalledWith(columnFormValue);
  // });

  it('should invoke columnService#createColumn() when "onColumnFormSaved()" is called', () => {
    // given the board
    component.board = board;

    spyOn(columnService, 'createColumn').and.returnValue(of());

    // given a form value
    const column = {
      title: 'Column title',
    };

    // when onColumnFormSaved() is called
    component.onColumnFormSaved(column);

    // then expect column service to be invoked
    expect(columnService.createColumn).toHaveBeenCalled();
  });

  it('should set observable property returned from columnService#createColumn()', () => {
    // given the board
    component.board = board;

    // given the columnService#createColumn() returns an observable of column
    const observable = of(column);
    spyOn(columnService, 'createColumn').and.returnValue(observable);

    // the observable property should be undefined at first
    expect(component.observable).toBeUndefined();

    // given a form value
    const formValue = {
      title: 'Column title',
    };

    // when onColumnFormSaved() is called
    component.onColumnFormSaved(formValue);

    // then expect the observable property to be set
    expect(component.observable).toBe(observable);
  });

  it('should unsubscribe from all subscriptions when ngOnDestroy() is called', () => {
    spyOn(component.subscriptions, 'unsubscribe');

    // when component is destroyed
    component.ngOnDestroy();

    // then expect to unsubscribe from all subscriptions
    expect(component.subscriptions.unsubscribe).toHaveBeenCalled();
  });

  it('should add to subscriptions', () => {
    // given the board
    component.board = board;

    // given the observable
    component.observable = new Observable();

    spyOn(columnService, 'createColumn').and.returnValue(of(column));
    spyOn(component.subscriptions, 'add');

    // given a form value
    const formValue = {
      title: 'Column title',
    };

    // when onColumnFormSaved() is called
    component.onColumnFormSaved(formValue);

    // then expect subscription to have been added to the subscriptions object
    expect(component.subscriptions.add).toHaveBeenCalled();
  });

  it('should invoke "handleCreateColumn()" within "onColumnFormSaved()"', () => {
    // given the board
    component.board = board;

    spyOn(columnService, 'createColumn').and.returnValue(of(column));
    spyOn(component, 'handleCreateColumn');

    // given a form value
    const formValue = {
      title: 'Column title',
    };

    component.onColumnFormSaved(formValue);

    expect(component.handleCreateColumn).toHaveBeenCalled();
  });

  it('should add column to columns list when handleCreateColumn() is invoked', () => {
    component.board = board;

    // when handleCreateColumn() is called
    component.handleCreateColumn(column);

    // then expect the column to have been added to the list
    expect(component.board.columns).toContain(column);
  });
});
