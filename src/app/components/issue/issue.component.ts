import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss'],
})
export class IssueComponent implements OnInit {
  @Input() details: object = { description: '' };

  constructor() {}

  ngOnInit(): void {}
}
