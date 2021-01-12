import { Component, OnInit } from '@angular/core';
import { Issue } from 'src/app/models/issue/issue';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  title: string;
  issues: Issue[];

  constructor() {}

  ngOnInit(): void {}
}
