import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
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
  private unsubscribe$ = new Subject<void>();

  sprint: Sprint;
  board: Board = {} as Board;
  columns: Column[] = [];

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
    // extract query params (sprint and project ids)
    this.route.queryParams.subscribe((queryParams) => {
      const sprintId = queryParams.sprint;
      const projectId = queryParams.project;

      // fetch the sprint
      this.sprintService
        .getSprint(projectId, sprintId)
        .pipe(take(1))
        .subscribe({
          next: (fetchedSprint: Sprint) => {
            console.log('FETCHED SPRINT: ' + JSON.stringify(fetchedSprint));
            this.sprint = fetchedSprint;

            if (this.sprint.board) {
              this.board = this.sprint.board;
              this.columns = this.board.columns;
            }
          },
        });
    });

    // listen for board form saved announcements
    this.boardIntercomService.boardFormSaved$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(this.onBoardFormSaved);

    // listen for column form saved announcements
    this.columnIntercomService.columnFormSaved$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(this.onColumnFormSaved);
  }

  onDisplayColumnForm() {
    this.dialog.open(ColumnFormComponent);
  }

  onDisplayBoardForm() {
    this.dialog.open(BoardFormComponent);
  }

  // create board
  onBoardFormSaved = (boardFormValue) => {
    this.boardService
      .createBoard(this.sprint.id, boardFormValue)
      .pipe(take(1))
      .subscribe({
        next: (createdBoard: Board) => {
          this.board = createdBoard;
          console.log('CREATED BOARD: ' + JSON.stringify(this.board));
        },
        error: (error) => console.log('ERROR: ' + error),
      });
  };

  // create column
  onColumnFormSaved = (columnFormValue) => {
    this.columnService
      .createColumn(this.sprint.board.id, columnFormValue)
      .pipe(take(1))
      .subscribe({
        next: (createdColumn: Column) => {
          this.columns = [...this.columns, createdColumn];
          console.log('CREATED COLUMN ' + JSON.stringify(createdColumn));
        },
        error: (error) => console.log('ERROR: ' + error),
      });
  };

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
