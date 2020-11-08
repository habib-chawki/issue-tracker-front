import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
})
export class IssuesComponent implements OnInit {
  issues: object[] = [{}, {}, {}];

  constructor() {}

  ngOnInit(): void {}

  onAddIssue() {
    this.issues.push({});
  }

  onCreated(form) {
    //TODO: handle new issue creation
  }
}
