import { Component, OnInit } from '@angular/core';
import Board from 'src/app/models/board/board';
import Column from 'src/app/models/column/column';
import { Issue } from 'src/app/models/issue/issue';
import { ColumnService } from 'src/app/services/column/column.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  board: Board;
  columns: Column[];

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
    this.columnService
      .createColumn(formValue, this.board.id)
      .subscribe((response: Column) => {
        this.board.columns.push(response);
      });
  }
}
