import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss'],
})
export class IssueComponent implements OnInit {
  @Input() details = { description: '' };
  @Output() issueClicked = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.issueClicked.emit(this.details);
  }
}
