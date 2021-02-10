import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import Board from 'src/app/models/board/board';
import Column from 'src/app/models/column/column';
import { ColumnCommunicationService } from 'src/app/services/column-communication/column-communication.service';
import { ColumnService } from 'src/app/services/column/column.service';
import { ColumnFormComponent } from '../column-form/column-form.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  @Input() board: Board = { columns: [] } as Board;

  observable: Observable<Column>;
  subscriptions = new Subscription();

  willDisplayColumnForm = false;

  constructor(
    private columnService: ColumnService,
    private columnCommunicationService: ColumnCommunicationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // listen for column form saved announcements
    this.columnCommunicationService.columnFormSaved$.subscribe(
      this.handleCreateColumn
    );
  }

  onDisplayColumnForm() {
    this.dialog.open(ColumnFormComponent);
    this.willDisplayColumnForm = true;
  }

  onColumnFormCancelled() {
    this.willDisplayColumnForm = false;
  }

  onColumnFormSaved(formValue) {
    this.observable = this.columnService.createColumn(formValue, this.board.id);
    this.subscriptions.add(this.observable.subscribe(this.handleCreateColumn));
  }

  handleCreateColumn = (column: Column) => {
    this.board.columns.push(column);
  };

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
