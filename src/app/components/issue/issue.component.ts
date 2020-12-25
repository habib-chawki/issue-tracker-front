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

  constructor(
    private storageService: StorageService,
    private issueCommunicationService: IssueCommunicationService
  ) {}

  ngOnInit(): void {}

  onClick() {
    this.issueCommunicationService.announceIssueClicked(this.issue);
  }

  onRemove() {
    this.issueCommunicationService.announceIssueRemoved(this.issue);
  }

  canRemove(): boolean {
    // issue reporter should be the logged-in user to render the remove button
    return (
      this.storageService.isUserLoggedIn() &&
      this.storageService.getUserIdentifier() === this.issue.reporter.id
    );
  }
}
