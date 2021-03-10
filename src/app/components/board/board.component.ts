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
  sprint: Sprint;

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
    // extract query params (sprint and project ids)
    this.route.queryParams.subscribe((queryParams) => {
      const sprintId = queryParams.sprint;
      const projectId = queryParams.project;

      // fetch the sprint
      this.sprintService
        .getSprint(projectId, sprintId)
        .subscribe((fetchedSprint: Sprint) => {
          console.log('FETCHED SPRINT: ' + JSON.stringify(fetchedSprint));
          this.sprint = fetchedSprint;
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

  onBoardFormSaved = (boardFormValue) => {
    this.boardService
      .createBoard(this.sprint.id, boardFormValue)
      .subscribe((board: Board) => {
        console.log('CREATED BOARD: ' + JSON.stringify(board));
        this.sprint.board = board;
      });
  };

  onColumnFormSaved = (columnFormValue) => {
    this.subscription = this.columnService
      .createColumn(this.board.id, columnFormValue)
      .subscribe((column: Column) => {
        console.log('CREATED COLUMN ' + JSON.stringify(column));
        this.sprint.board.columns.push(column);
      });
  };

  get board() {
    return this.sprint?.board;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
