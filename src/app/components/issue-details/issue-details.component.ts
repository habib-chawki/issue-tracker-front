import { Component, Input, OnInit } from '@angular/core';
import { Issue } from 'src/app/models/issue/issue';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.scss'],
})
export class IssueDetailsComponent implements OnInit {
  @Input() issue: Issue = {} as Issue;

  constructor() {}

  ngOnInit(): void {}
}
