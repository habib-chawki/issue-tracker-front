import { Component, Input, OnInit } from '@angular/core';
import { Issue } from 'src/app/models/issue/issue';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() title: string;
  @Input() issues: Issue[];

  constructor() {}

  ngOnInit(): void {}
}
