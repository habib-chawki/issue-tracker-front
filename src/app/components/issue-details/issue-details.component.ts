import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.scss'],
})
export class IssueDetailsComponent implements OnInit {
  @Input() details: string = '';

  constructor() {}

  ngOnInit(): void {}
}
