import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comment/comment';
import { CommentService } from 'src/app/services/comment/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comment[];
  @Input() issueId: string;

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {}

  onCreateComment(comment: string) {
    this.commentService.createComment(comment);
  }

  onRemoveComment(comment: Comment) {
    const index = this.comments.findIndex((item) => item === comment);
    this.comments.splice(index, 1);
  }

  onUpdateComment(comment: Comment) {
    const index = this.comments.findIndex((item) => item.id === comment.id);
    this.comments[index] = comment;
  }
}
