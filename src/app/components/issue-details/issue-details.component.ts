import { Component, Inject, Input, OnInit } from '@angular/core';
import { Issue } from 'src/app/models/issue/issue';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.scss'],
})
export class IssueDetailsComponent implements OnInit {
  @Inject(MAT_DIALOG_DATA) issue: Issue = {} as Issue;

  constructor() {}

  ngOnInit(): void {}
}
