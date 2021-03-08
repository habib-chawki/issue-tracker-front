import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Issue } from 'src/app/models/issue/issue';
import { IssueService } from 'src/app/services/issue/issue.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
})
export class IssuesComponent implements OnInit {
  @Input() issues: Issue[] = [];

  constructor(private issueService: IssueService) {}

  ngOnInit(): void {}

  // invoked when the issue remove button is clicked
  onRemoveIssue(issue: Issue) {
    this.issueService.deleteIssue(issue.id).subscribe(() => {
      const index = this.issues.indexOf(issue);
      this.issues.splice(index, 1);
    });
  }

  // handle issue drop
  onDrop(event: CdkDragDrop<Issue[]>) {
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
