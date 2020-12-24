import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comment/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  comments: Comment[];

  constructor() {}

  ngOnInit(): void {}

  onRemoveComment(comment: Comment) {}
}
