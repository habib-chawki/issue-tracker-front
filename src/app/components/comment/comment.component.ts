import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from 'src/app/models/comment/comment';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;

  @Output() commentRemoved = new EventEmitter();
  @Output() commentUpdated = new EventEmitter();

  willDisplayUpdateField: boolean = false;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {}

  onRemove() {
    this.commentRemoved.emit(this.comment);
  }

  onUpdate() {
    this.willDisplayUpdateField = true;
  }

  onConfirmUpdate(updatedContent: string) {
    // update only when content has been changed
    if (this.comment.content !== updatedContent.trim()) {
      this.comment.content = updatedContent;
      this.commentUpdated.emit(this.comment);
    }

    // hide update input field
    this.willDisplayUpdateField = false;
  }

  onCancelUpdate() {
    this.willDisplayUpdateField = false;
  }

  canModify(): boolean {
    return (
      this.storageService.isUserLoggedIn() &&
      this.storageService.getUserIdentifier() == this.comment.owner.id
    );
  }
}
