import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Issue } from 'src/app/models/issue/issue';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
})
export class IssuesComponent implements OnInit {
  @Input() issues: Issue[] = [];

  constructor() {}

  ngOnInit(): void {}

  // invoked when the issue remove button is clicked
  onRemoveIssue(issue: Issue) {
    // remove the issue
    const index = this.issues.indexOf(issue);
    this.issues.splice(index, 1);
  }

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
