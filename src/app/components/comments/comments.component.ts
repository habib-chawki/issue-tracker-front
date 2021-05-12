import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Comment } from 'src/app/models/comment/comment';
import { CommentService } from 'src/app/services/comment/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input() comments: Comment[] = [];
  @Input() issueId: string;

  observable: Observable<Comment>;
  subscriptions = new Subscription();

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {}

  onCreateComment(commentInputField) {
    // get input field value
    const content = commentInputField.value;

    this.commentService
      .createComment(content, this.issueId)
      .pipe(take(1))
      .subscribe((createdComment: Comment) => {
        console.log('COMMENT CREATED: ' + JSON.stringify(createdComment));
        this.comments.push(createdComment);

        // clear input field
        commentInputField.value = '';
      });
  }

  onRemoveComment(comment: Comment) {
    this.commentService
      .removeComment(comment.id, this.issueId)
      .pipe(take(1))
      .subscribe(() => {
        const index = this.comments.findIndex(
          (element) => element.id === comment.id
        );
        this.comments.splice(index, 1);
        console.log('COMMENT REMOVED: ' + JSON.stringify(comment));
      });
  }

  onUpdateComment(comment: Comment) {
    this.observable = this.commentService.updateComment(
      comment.content,
      comment.id,
      this.issueId
    );

    this.subscriptions.add(this.observable.subscribe(this.handleUpdateComment));
  }

  handleUpdateComment(comment: Comment) {
    const index = this.comments.findIndex((item) => item.id === comment.id);
    this.comments[index] = comment;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
