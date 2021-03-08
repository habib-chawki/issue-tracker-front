import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import Column from 'src/app/models/column/column';
import { Issue } from 'src/app/models/issue/issue';
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

  onDrop = (event: CdkDragDrop<Issue[]>) => {
    if (event.previousContainer === event.container) {
      // within the same column
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // update the issue column
      this.columnService.updateIssueColumn(
        this.boardId,
        event.previousContainer.id,
        event.item.data.id,
        event.container.id
      );

      // between columns
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  };
}
