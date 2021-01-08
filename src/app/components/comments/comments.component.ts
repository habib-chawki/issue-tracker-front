import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comment/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comment[];
  @Input() issueId: string;

  constructor() {}

  ngOnInit(): void {}

  onCreateComment(comment: string) {}

  onRemoveComment(comment: Comment) {
    const index = this.comments.findIndex((item) => item === comment);
    this.comments.splice(index, 1);
  }

  onUpdateComment(comment: Comment) {
    const index = this.comments.findIndex((item) => item.id === comment.id);
    this.comments[index] = comment;
  }
}
