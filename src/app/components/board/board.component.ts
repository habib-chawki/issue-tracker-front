import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import Board from 'src/app/models/board/board';
import Column from 'src/app/models/column/column';
import { ColumnService } from 'src/app/services/column/column.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  board: Board;
  columns: Column[] = [];

  observable: Observable<Column>;
  subscriptions: Subscription;

  willDisplayColumnForm = false;

  constructor(private columnService: ColumnService) {}

  ngOnInit(): void {
    this.subscriptions = new Subscription();
  }

  onDisplayColumnForm() {
    this.willDisplayColumnForm = true;
  }

  onColumnFormCancelled() {
    this.willDisplayColumnForm = false;
  }

  onColumnFormSaved(formValue) {
    this.observable = this.columnService.createColumn(formValue, this.board.id);

    this.subscriptions.add(
      this.observable.subscribe((response: Column) => {
        this.columns.push(response);
      })
    );
  }

  handleCreateColumn(column: Column) {
    this.columns.push(column);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
