import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Comment } from 'src/app/models/comment/comment';
import { CommentService } from 'src/app/services/comment/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input() comments: Comment[];
  @Input() issueId: string;

  observable: Observable<Comment>;
  subscriptions: Subscription;

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {}

  onCreateComment(content: string) {
    this.observable = this.commentService.createComment(content, this.issueId);
    this.subscriptions = this.observable.subscribe(this.handleCreateComment);
  }

  handleCreateComment(response: Comment) {
    this.comments.push(response);
  }

  onRemoveComment(comment: Comment) {
    const index = this.comments.findIndex((item) => item === comment);
    this.comments.splice(index, 1);
  }

  onUpdateComment(comment: Comment) {
    const index = this.comments.findIndex((item) => item.id === comment.id);
    this.comments[index] = comment;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
