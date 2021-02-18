import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Issue } from 'src/app/models/issue/issue';
import { StorageService } from 'src/app/services/storage/storage.service';
import { IssueDetailsComponent } from '../issue-details/issue-details.component';
import { IssueFormComponent } from '../../forms/issue-form/issue-form.component';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss'],
})
export class IssueComponent implements OnInit {
  @Input() issue: Issue = {} as Issue;

  @Output() issueRemoved = new EventEmitter();

  constructor(
    private storageService: StorageService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onDisplayDetails() {
    this.dialog.open(IssueDetailsComponent, { data: this.issue });
  }

  onRemove() {
    this.issueRemoved.emit(this.issue);
  }

  onUpdate() {
    this.dialog.open(IssueFormComponent, { data: this.issue });
  }

  canModify(): boolean {
    // render the update and remove buttons only when the logged-in user is the issue reporter
    return (
      this.storageService.isUserLoggedIn() &&
      this.storageService.getUserIdentifier() === this.issue.reporter.id
    );
  }
}
