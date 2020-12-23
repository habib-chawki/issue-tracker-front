import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comment/comment';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {}

  canRemove(): boolean {
    return (
      this.storageService.isUserLoggedIn() &&
      this.storageService.getUserIdentifier() === this.comment.owner.id
    );
  }

  onRemove() {}
}
