import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import Board from 'src/app/models/board/board';
import Column from 'src/app/models/column/column';
import Sprint from 'src/app/models/sprint/sprint';
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
    private columnService: ColumnService,
    private columnCommunicationService: ColumnIntercomService,
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

    // listen for column form saved announcements
    this.columnCommunicationService.columnFormSaved$.subscribe(
      this.onColumnFormSaved
    );
  }

  onDisplayColumnForm() {
    this.dialog.open(ColumnFormComponent);
  }

  onColumnFormSaved = (formValue) => {
    this.subscription = this.columnService
      .createColumn(formValue, this.board.id)
      .subscribe(this.handleCreateColumn);
  };

  handleCreateColumn = (column: Column) => {
    this.board.columns.push(column);
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
