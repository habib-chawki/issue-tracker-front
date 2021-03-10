import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import Column from 'src/app/models/column/column';
import { ColumnService } from 'src/app/services/column/column.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() column: Column;

  @Input() boardId: string;

  constructor(private columnService: ColumnService) {}

  ngOnInit(): void {}

  onDrop = (event: CdkDragDrop<Column>) => {
    if (event.previousContainer === event.container) {
      // drag issues within the same column
      moveItemInArray(
        event.container.data.issues,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const boardId = this.boardId;
      const columnId = event.previousContainer.data.id;
      const issueId = event.item.data.id;
      const newColumnId = event.container.data.id;

      // update the issue column
      this.columnService
        .updateIssueColumn(boardId, columnId, issueId, newColumnId)
        .subscribe({
          next: () => {
            // drag issues between columns
            transferArrayItem(
              event.previousContainer.data.issues,
              event.container.data.issues,
              event.previousIndex,
              event.currentIndex
            );
          },
          error: (error) => console.log('ERROR: ' + JSON.stringify(error)),
        });
    }
  };
}
