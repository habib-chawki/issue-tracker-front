import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Issue } from 'src/app/models/issue';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss'],
})
export class IssueComponent implements OnInit {
  @Input() details: Issue = {} as Issue;
  @Output() issueClicked = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.issueClicked.emit(this.details);
  }
}
