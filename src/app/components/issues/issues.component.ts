import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Issue } from 'src/app/models/issue/issue';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
})
export class IssuesComponent implements OnInit {
  @Input() issues: Issue[] = [];

  issueDetails: Issue;
  willDisplayIssueDetails: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  // invoked when the issue remove button is clicked
  onRemoveIssue(issue: Issue) {
    // remove the issue
    const index = this.issues.indexOf(issue);
    this.issues.splice(index, 1);
  }

  // invoked when an issue component is clicked
  onDisplayIssueDetails(issue: Issue) {
    this.issueDetails = issue;
    this.willDisplayIssueDetails = true;
  }

  // invoked when the close button of the issueDetails component is clicked
  onHideIssueDetails() {
    this.willDisplayIssueDetails = false;
  }

  // handle issue drop
  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.issues, event.previousIndex, event.currentIndex);
  }
}
