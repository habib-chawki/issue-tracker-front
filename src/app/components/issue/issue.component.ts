import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Issue } from 'src/app/models/issue';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss'],
})
export class IssueComponent implements OnInit {
  @Input() issue: Issue = {} as Issue;

  @Output() issueClicked = new EventEmitter();
  @Output() issueRemoved = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.issueClicked.emit(this.issue);
  }

  onRemove() {
    this.issueRemoved.emit(this.issue);
  }
}
