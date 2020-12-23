import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comment/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  comment: Comment;

  constructor() {}

  ngOnInit(): void {}
}
