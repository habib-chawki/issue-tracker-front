import { Component, OnInit } from '@angular/core';
import { Issue } from 'src/app/models/issue/issue';
import { ColumnService } from 'src/app/services/column/column.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  columns: { title: string; issues: Issue[] }[];

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
    this.columnService.createColumn(formValue, '100');
  }
}
