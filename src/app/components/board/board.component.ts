import { Component, OnInit } from '@angular/core';
import { Issue } from 'src/app/models/issue/issue';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  columns: { title: string; issues: Issue[] }[];

  constructor() {}

  ngOnInit(): void {}
}
