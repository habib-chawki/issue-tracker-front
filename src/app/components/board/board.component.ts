import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import Board from 'src/app/models/board/board';
import Column from 'src/app/models/column/column';
import { Issue } from 'src/app/models/issue/issue';
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
  @Input() board: Board = { columns: [] } as Board;

  sprint: Sprint;

  sprintId: string;
  projectId: string;

  observable: Observable<Column>;
  subscriptions = new Subscription();

  constructor(
    private columnService: ColumnService,
    private columnCommunicationService: ColumnIntercomService,
    private sprintService: SprintService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // extract sprint id query param
    this.route.params.subscribe((queryParams) => {
      this.sprintId = queryParams.sprint;
      this.projectId = queryParams.projectId;
    });

    // fetch sprint backlog (list of issues)
    this.sprintService
      .getSprintBacklog(this.projectId, this.sprintId)
      .subscribe((response) => {
        this.sprint = response;
      });

    // listen for column form saved announcements
    this.columnCommunicationService.columnFormSaved$.subscribe(
      this.handleCreateColumn
    );
  }

  onDisplayColumnForm() {
    this.dialog.open(ColumnFormComponent);
  }

  onColumnFormSaved(formValue) {
    this.observable = this.columnService.createColumn(formValue, this.board.id);
    this.subscriptions.add(this.observable.subscribe(this.handleCreateColumn));
  }

  handleCreateColumn = (column: Column) => {
    this.board.columns.push(column);
  };

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
