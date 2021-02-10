import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Issue } from 'src/app/models/issue/issue';
import { IssueCommunicationService } from 'src/app/services/issue-communication/issue-communication.service';
import { IssueDetailsComponent } from '../issue-details/issue-details.component';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
})
export class IssuesComponent implements OnInit {
  @Input() issues: Issue[] = [];

  constructor(
    private dialog: MatDialog,
    private issueCommunicationService: IssueCommunicationService
  ) {}

  ngOnInit(): void {
    this.issueCommunicationService.displayIssueDetails$.subscribe(
      this.onDisplayIssueDetails
    );
  }

  // invoked when the issue remove button is clicked
  onRemoveIssue(issue: Issue) {
    // remove the issue
    const index = this.issues.indexOf(issue);
    this.issues.splice(index, 1);
  }

  // invoked when an issue component is double clicked
  onDisplayIssueDetails = (issue: Issue) => {
    // open the issue details dialog
    this.dialog.open(IssueDetailsComponent, { data: issue });
  };

  // handle issue drop
  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      // within the same list
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // between lists
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
