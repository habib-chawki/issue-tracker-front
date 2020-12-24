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
}
