import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Issue } from 'src/app/models/issue/issue';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss'],
})
export class IssueComponent implements OnInit {
  @Input() issue: Issue = {} as Issue;

  @Output() issueClicked = new EventEmitter();
  @Output() issueRemoved = new EventEmitter();

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {}

  onClick() {
    this.issueClicked.emit(this.issue);
  }

  onRemove() {
    this.issueRemoved.emit(this.issue);
  }

  canRemove(): boolean {
    // issue reporter should be the logged-in user to render the remove button
    return (
      this.storageService.isUserLoggedIn() &&
      this.storageService.getUserIdentifier() === this.issue.reporter.id
    );
  }
}
