import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Board from 'src/app/models/board/board';
import Column from 'src/app/models/column/column';
import { ColumnService } from 'src/app/services/column/column.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  board: Board;
  columns: Column[];

  observable: Observable<Column>;

  willDisplayColumnForm = false;

  constructor(private columnService: ColumnService) {}

  ngOnInit(): void {}

  onDisplayColumnForm() {
    this.willDisplayColumnForm = true;
  }

  onColumnFormCancelled() {
    this.willDisplayColumnForm = false;
  }

  onColumnFormSaved(formValue) {
    this.observable = this.columnService.createColumn(formValue, this.board.id);
  }
}
