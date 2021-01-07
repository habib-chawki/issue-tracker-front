import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Issue } from 'src/app/models/issue/issue';
import { IssueCommunicationService } from 'src/app/services/issue-communication/issue-communication.service';
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

  constructor(
    private storageService: StorageService,
    private issueCommunicationService: IssueCommunicationService
  ) {}

  ngOnInit(): void {}

  onClick() {
    this.issueClicked.emit(this.issue);
  }

  onRemove() {
    this.issueRemoved.emit(this.issue);
  }

  onUpdate() {
    this.issueCommunicationService.announceIssueUpdate(this.issue);
  }

  canModify(): boolean {
    // render the update and remove buttons only when the logged-in user is the issue reporter
    return (
      this.storageService.isUserLoggedIn() &&
      this.storageService.getUserIdentifier() === this.issue.reporter.id
    );
  }
}
