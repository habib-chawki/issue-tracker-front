import { Component, Inject, OnInit } from '@angular/core';
import { Issue } from 'src/app/models/issue/issue';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.scss'],
})
export class IssueDetailsComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public issue: Issue) {}

  ngOnInit(): void {}
}
