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

  willDisplayUpdateField: boolean = false;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {}

  onRemove() {
    this.commentRemoved.emit(this.comment);
  }

  onUpdate() {
    this.willDisplayUpdateField = true;
  }

  onConfirmUpdate() {}

  canModify(): boolean {
    return (
      this.storageService.isUserLoggedIn() &&
      this.storageService.getUserIdentifier() === this.comment.owner.id
    );
  }
}
