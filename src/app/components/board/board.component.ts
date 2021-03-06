import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BoardFormComponent } from 'src/app/forms/board-form/board-form.component';
import Board from 'src/app/models/board/board';
import Column from 'src/app/models/column/column';
import Sprint from 'src/app/models/sprint/sprint';
import { BoardIntercomService } from 'src/app/services/board-intercom/board-intercom.service';
import { BoardService } from 'src/app/services/board/board.service';
import { ColumnIntercomService } from 'src/app/services/column-intercom/column-intercom.service';
import { ColumnService } from 'src/app/services/column/column.service';
import { SprintService } from 'src/app/services/sprint/sprint.service';
import { ColumnFormComponent } from '../../forms/column-form/column-form.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  board: Board = { columns: [] } as Board;

  sprint: Sprint;

  sprintId: string;
  projectId: string;

  subscription = new Subscription();

  constructor(
    private boardService: BoardService,
    private boardIntercomService: BoardIntercomService,
    private columnService: ColumnService,
    private columnIntercomService: ColumnIntercomService,
    private sprintService: SprintService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // extract query params
    this.route.queryParams.subscribe((queryParams) => {
      this.sprintId = queryParams.sprint;
      this.projectId = queryParams.project;

      // fetch sprint
      this.sprintService
        .getSprint(this.projectId, this.sprintId)
        .subscribe((response) => {
          this.sprint = response;
        });
    });

    // listen for board form saved announcements
    this.boardIntercomService.boardFormSaved$.subscribe(this.onBoardFormSaved);

    // listen for column form saved announcements
    this.columnIntercomService.columnFormSaved$.subscribe(
      this.onColumnFormSaved
    );
  }

  onDisplayColumnForm() {
    this.dialog.open(ColumnFormComponent);
  }

  onDisplayBoardForm() {
    this.dialog.open(BoardFormComponent);
  }

  onColumnFormSaved = (columnFormValue) => {
    this.subscription = this.columnService
      .createColumn(columnFormValue, this.board.id)
      .subscribe((column: Column) => {
        this.board.columns.push(column);
      });
  };

  onBoardFormSaved(boardFormValue) {
    this.boardService.createBoard(boardFormValue).subscribe((response) => {
      this.board = response;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
